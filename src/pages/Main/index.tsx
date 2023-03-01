import React, {useContext, useEffect, useState} from 'react';
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
                const dates: { [key: string]: string } = {};
                goals.forEach((v) => {
                    dates[v.year] = v.year
                })
                setData({dates: Object.values(dates), goals: goals});
                setNeedUpdate(false)
            }

            setTimeout(() => setNeedUpdate(true), 300000)

        })()
        // }
    }, [needUpdate]);


    let filteredGoalsBySearch: IGoal[];
    let filteredGoalsByYear: IGoal[];
    let datesOfFilteredGoalsByYear: { [key: string]: string } = {};
    let filteredDates: string[];

    if (data) {
        filteredGoalsBySearch = data.goals.filter((goal) => goal.name.toLowerCase().includes(searchValue.toLowerCase()));

        if (filtering === 'not filtered') {
            filteredGoalsByYear = filteredGoalsBySearch
        } else {
            filteredGoalsByYear = filteredGoalsBySearch.filter((v) => filtering === v.year);
        }

        filteredGoalsByYear.forEach((v) => {
            datesOfFilteredGoalsByYear[v.year] = v.year
        });

        filteredDates = Object.values(datesOfFilteredGoalsByYear).sort((a, b) => +b - (+a));
    }

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
                <div
                    style={{background: theme === 'light' ? 'rgb(250 250 250)' : 'rgb(19,19,19)',
                        color: theme === 'light' ? '' : 'rgb(229 229 229)' }}
                    className='styled_scrollbar absolute overflow-y-auto h-[100vh] w-[100vw]'>
                    <header
                        className={`${theme === 'light'? 'bg-white border-teal-500' : 'bg-neutral-800 border-black/0'} w-full shadow-md h-[5vh] flex justify-between items-center border-b-2`}>
                        <h1 className='ml-4 text-xl font-sans font-semibold'>Yearly Goal Tracker</h1>
                        <button className={`${theme === 'light'? 'border-teal-500' : 'border-neutral-600'} mr-4 px-2 border-l-2`}
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
                                    className={`${theme === 'light' ? 'bg-teal-500' : 'bg-neutral-700'} shadow-md select-none font-mono rounded-full h-16 w-16 text-white hover:scale-105 active:scale-100 text-3xl`}>
                                <p className='rotate-45'>✕︎</p>
                            </button>
                        </div>
                        <div className='flex justify-center relative items-center w-[40%] h-full'>
                            <input type={'text'} placeholder={'Search...'}
                                   className={`${theme === 'light' ? 'border-teal-500' : 'border-black/0 shadow-md bg-neutral-800'} outline-none w-[60%] h-[70%] rounded-full align-middle px-4 border-2`}
                                   onChange={(e) => {
                                       setSearchValue(e.currentTarget.value)
                                   }}
                            />
                        </div>
                    </div>
                    {
                        data
                            ? (
                                filteredDates!.length > 0 ?
                                    filteredDates!.map((date, i) => {
                                        return <YearBlock key={i}
                                                          year={date}
                                                          sorting={sorting}
                                                          theme={theme}
                                                          setStateOfEditingPanel={setStateOfEditingPanel}
                                                          setNeedUpdate={setNeedUpdate}
                                                          goals={filteredGoalsByYear.filter((v) => v.year === date)}/>
                                    }) : null
                            )
                            : null
                    }
                </div>
            </>
        );
    }
}

export default Main;


