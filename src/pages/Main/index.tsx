import React, {useContext, useEffect, useState} from 'react';
import Tile from "../../components/Tile";
import SortingPanel from "../../components/SortingPanel";
import GoalCreationPanel from "../../components/GoalCreationPanel";
import GoalEditingPanel from "../../components/GoalEditingPanel";
import {Api} from "../../App";
import {IGoal} from "../../types";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import YearBlock from "../../components/YearBlock";

const Main = ({setIsLoggedIn}: { setIsLoggedIn: React.Dispatch<React.SetStateAction<{ state: boolean }>> }) => {

    const api = useContext(Api)
    const [openGoalCreationPanel, setOpenGoalCreationPanel] = useState<boolean>(false);
    const [stateOfEditingPanel, setStateOfEditingPanel] = useState<{ open: boolean, data: IGoal | undefined }>({
        open: false,
        data: undefined
    });
    const [data, setData] = useState<{ dates: string[], goals: IGoal[] } | undefined>(undefined);
    const [sorting, setSorting] = useState<number>(1);
    const [filtering, setFiltering] = useState<string>('not filtered');
    const [searchValue, setSearchValue] = useState('');
    const [needUpdate, setNeedUpdate] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    const nav = useNavigate();

    useEffect(() => {
        // if(!data) {
        (async () => {
            let response = await api.getGoals();

            if (!response.isAuthorized) {
                setIsLoggedIn({state: false});
                return;
            }

            if (response.isSuccessful && response.result) {
                const goals = Object.values(response.result)
                const dates: { [key: string]:string } = {};
                goals.forEach((v)=>{dates[v.year] = v.year})
                setData({dates:Object.values(dates), goals:goals});
                setNeedUpdate(false)
            }
        })()
        // }
    }, [data, needUpdate]);

    let filteredGoalsBySearch:IGoal[];
    let filteredGoalsByYear:IGoal[];
    let datesOfFilteredGoalsByYear:{[key:string]:string} = {};
    let filteredDates:string[];

    if(data){
        filteredGoalsBySearch = data.goals.filter((goal) => goal.name.toLowerCase().includes(searchValue.toLowerCase()));

        if(filtering === 'not filtered'){
            filteredGoalsByYear = filteredGoalsBySearch
        } else {
            filteredGoalsByYear = filteredGoalsBySearch.filter((v)=>filtering === v.year);
        }

        filteredGoalsByYear.forEach((v)=>{
            datesOfFilteredGoalsByYear[v.year] = v.year
        });

        filteredDates = Object.values(datesOfFilteredGoalsByYear).sort((a, b) => +b - (+a));
    }

    setInterval(() => setNeedUpdate(true), 300000)

    if (!data) {
        return <div className='justify-center items-center flex h-full w-full'>
            <CircularProgress/>
        </div>
    } else {
        return (
                <>
                    {
                        openGoalCreationPanel
                            ? <GoalCreationPanel theme={theme} setNeedUpdate={setNeedUpdate}
                                                 closeFunction={setOpenGoalCreationPanel}/>
                            : null
                    }
                    {
                        stateOfEditingPanel.open
                            ? <GoalEditingPanel theme={theme} data={stateOfEditingPanel.data}
                                                setOpenState={setStateOfEditingPanel}/>
                            : null
                    }
                    <div className={theme === 'light'
                        ? 'bg-gray-50 styled_scrollbar absolute overflow-y-auto h-[100vh] w-[100vw]'
                        : 'bg-gray-900 text-gray-400 styled_scrollbar absolute overflow-y-auto h-[100vh] w-[100vw]'}>
                        <header className={theme === 'light'
                            ? 'bg-white border-teal-500 border-b-2 w-full justify-between shadow-md h-[5vh] flex items-center'
                            : 'w-full shadow-md h-[5vh] flex justify-between items-center bg-gray-800 border-teal-500 border-b-2'}>
                            <p className={theme === 'light'
                                ? 'ml-4 text-xl font-sans font-semibold'
                                : 'ml-4 text-xl font-sans font-semibold'}>Yearly Goal Tracker</p>

                            <button className='mr-4 px-2 border-teal-500 border-l-2'
                                    onClick={() => {
                                        setIsLoggedIn({state: false});
                                        nav('/yearly_goal_tracker/auth');
                                    }}
                            >Log out
                            </button>
                        </header>
                        <div className='flex justify-between items-center py-4 h-24'>
                            <div className='flex px-6 items-center justify-center relative w-[40%] h-full'>
                                <SortingPanel theme={theme} setTheme={setTheme} setFiltering={setFiltering}
                                              setSorting={setSorting} years={data.dates}/>
                            </div>
                            <div className='flex grow justify-center'>
                                <button onClick={() => setOpenGoalCreationPanel(true)}
                                        className='select-none bg-teal-500 font-mono rounded-full h-16 w-16 text-white hover:scale-105 active:scale-100 text-3xl'>
                                    <p className='rotate-45'>✕︎</p>
                                </button>
                            </div>
                            <div className='flex justify-center relative items-center w-[40%] h-full'>
                                <input type={'text'} placeholder={'Search...'}
                                       className={theme === 'light'
                                           ? 'outline-none w-[60%] h-[70%] rounded-full align-middle px-4 border-2 border-teal-500'
                                           : 'bg-gray-700 outline-none w-[60%] h-[70%] rounded-full align-middle px-4 border-2 border-teal-500'
                                       }
                                       onChange={(e) => {
                                           setSearchValue(e.currentTarget.value)
                                       }}
                                />
                            </div>
                        </div>
                        {
                            data
                                ? (
                                    // @ts-ignore
                                    filteredDates.length > 0 ?
                                        // @ts-ignore
                                        filteredDates.map((date, i) => {
                                            return <YearBlock key={i}
                                                              year={date}
                                                              sorting={sorting}
                                                              theme={theme}
                                                              setStateOfEditingPanel={setStateOfEditingPanel}
                                                              setNeedUpdate={setNeedUpdate}
                                                              goals={filteredGoalsByYear.filter((v)=>v.year === date)}/>
                                        }) : null
                                )
                                : null

                                // Object.keys(data).sort((a, b) => +b - (+a)).filter((v) => {
                                //     if (filtering === 1) return v;
                                //     if (+filtering === +v) return v;
                                // }).map((v, i) => {
                                //     return data[v].length === 0
                                //         ? null
                                //         : (
                                //             data[v].filter((v) => v.name.toLowerCase().includes(searchValue.toLowerCase())).length === 0
                                //                 ? null
                                //                 : <>
                                //                     <div key={i} className='my-2 flex flex-row justify-center items-center'>
                                //                         <div className='h-[1px] w-[40%] bg-gray-500'/>
                                //                         <div className='mx-8'>{v}</div>
                                //                         <div className='h-[1px] w-[40%] bg-gray-500'/>
                                //                     </div>
                                //                     <div key={i} className='p-6 flex flex-wrap gap-4 '>
                                //                         {
                                //                             (() => {
                                //                                 if (sorting === 1) {
                                //                                     return data[v].filter((v) => v.name.toLowerCase().includes(searchValue.toLowerCase())).map((v, i) => {
                                //                                         return <Tile theme={theme} onUpdate={setNeedUpdate} key={i}
                                //                                                      year={v.year} name={v.name} id={v.id}
                                //                                                      percent={getPercent(v.steps)} steps={v.steps}
                                //                                                      openEditingPanel={setStateOfEditingPanel}/>
                                //                                     });
                                //                                 } else if (sorting === 2) {
                                //                                     return data[v].filter((v) => v.name.toLowerCase().includes(searchValue.toLowerCase())).slice(0).sort((a, b) => {
                                //                                         return getPercent(a.steps) - getPercent(b.steps)
                                //                                     }).map((v, i) => {
                                //                                         return <Tile theme={theme} onUpdate={setNeedUpdate} key={i}
                                //                                                      year={v.year} name={v.name} id={v.id}
                                //                                                      percent={getPercent(v.steps)} steps={v.steps}
                                //                                                      openEditingPanel={setStateOfEditingPanel}/>
                                //                                     })
                                //                                 } else if (sorting === 3) {
                                //                                     return data[v].filter((v) => v.name.toLowerCase().includes(searchValue.toLowerCase())).slice(0).sort((a, b) => {
                                //                                         return getPercent(b.steps) - getPercent(a.steps)
                                //                                     }).map((v, i) => {
                                //                                         return <Tile theme={theme} onUpdate={setNeedUpdate} key={i}
                                //                                                      year={v.year} name={v.name} id={v.id}
                                //                                                      percent={getPercent(v.steps)} steps={v.steps}
                                //                                                      openEditingPanel={setStateOfEditingPanel}/>
                                //                                     })
                                //                                 }
                                //                             })()
                                //                         }
                                //                     </div>
                                //                 </>
                                //         )
                                // })

                        }
                    </div>
                </>
            );
    }
}

export default Main;


