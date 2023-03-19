import React, {useContext, useEffect, useMemo, useState} from 'react';
import SortingPanel from "../../components/SortingPanel";
import GoalCreationPanel from "../../components/GoalCreationPanel";
import GoalEditingPanel from "../../components/GoalEditingPanel";
import {Api} from "../../App";
import {IGoal} from "../../types";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import YearBlock from "../../components/YearBlock";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setNeedUpdate, setSearch, setOpenGoalCreationPanel} from '../../store/slice'

const Main = ({setIsLoggedIn}: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const api = useContext(Api)
    const nav = useNavigate();
    const {
        filtering,
        theme,
        search,
        needUpdate,
        openGoalCreationPanel,
        stateOfEditingPanel} = useSelector((state: RootState) => state.goalTracker);
    const dispatch = useDispatch();

    const [data, setData] = useState<{ dates: string[], goals: IGoal[] } | undefined>(undefined);

    useEffect(() => {
        (async () => {
            let response = await api.getGoals();

            if (!response.isAuthorized) {
                setIsLoggedIn(false);
                return;
            }

            if (response.isSuccessful && response.result) {
                const goals = Object.values(response.result)
                const dates: { [key: string]: string } = {};
                goals.forEach((v) => {
                    dates[v.year] = v.year
                })
                setData({dates: Object.values(dates), goals: goals});
                dispatch(setNeedUpdate(false));
            }

            setTimeout(() => setNeedUpdate(true), 300000)

        })()
    }, [needUpdate]);

    const filteredGoalsBySearch = useMemo(()=>{
        if (data) {
            return data.goals.filter((goal) => goal.name.toLowerCase().includes(search.toLowerCase()));
        }
    }, [search, data]);

    const filteredGoalsByYear = useMemo(()=>{
        if(data){
            if (filtering === 'not filtered') {
                return filteredGoalsBySearch
            } else {
                return filteredGoalsBySearch!.filter((v) => filtering === v.year);
            }
        }
    }, [filtering, filteredGoalsBySearch]);

    const datesOfFilteredGoalsByYear = useMemo(()=>{
        const obj:{ [key: string]: string } = {};
        if (data) {
            filteredGoalsByYear!.forEach((v) => {
                obj[v.year] = v.year
            });
        }
        return obj;
    }, [filteredGoalsByYear]);

    const filteredDates = useMemo(()=>{
        if (data) {
            return Object.values(datesOfFilteredGoalsByYear).sort((a, b) => +b - (+a));
        }
    }, [datesOfFilteredGoalsByYear]);

    if (!data) {
        return <div className={`${theme === 'light' ? 'bg-neutral-100' : 'bg-neutral-900'} justify-center items-center bg-neutral-100 flex h-full w-full`}>
            <CircularProgress/>
        </div>
    } else {
        return (
            <>
                {
                    openGoalCreationPanel
                        ? <GoalCreationPanel />
                        : null
                }
                {
                    stateOfEditingPanel.open
                        ? <GoalEditingPanel />
                        : null
                }
                <div
                    className={`${theme === 'light' ? 'bg-neutral-100' : 'text-neutral-200 bg-neutral-900'} styled_scrollbar absolute overflow-y-auto h-[100vh] w-[100vw]`}>
                    <header
                        className={`${theme === 'light'? 'bg-white border-teal-400' : 'bg-neutral-800 border-black/0'} w-full shadow-md h-[46px] flex justify-between items-center border-b-2`}>
                        <h1 className='ml-4 text-xl font-sans font-semibold'>Yearly Goal Tracker</h1>
                        <button className={`${theme === 'light'? 'border-teal-400' : 'border-neutral-600'} mr-4 px-2 border-l-2`}
                                onClick={() => {
                                    setIsLoggedIn(false);
                                    nav('/yearly_goal_tracker/auth');
                                }}
                        >Log out
                        </button>
                    </header>
                    <div className='flex justify-between items-center py-4 h-24'>
                        <div className='flex px-6 items-center justify-center relative w-[40%] h-full'>
                            <SortingPanel years={data.dates}/>
                        </div>
                        <div className='flex grow justify-center'>
                            <button onClick={() => dispatch(setOpenGoalCreationPanel(true))}
                                    className={`${theme === 'light' ? 'bg-teal-500' : 'bg-neutral-700'} shadow select-none font-mono rounded-full h-14 w-14 text-white hover:scale-105 active:scale-100 text-3xl`}>
                                <p className='rotate-45'>✕︎</p>
                            </button>
                        </div>
                        <div className='flex justify-center relative items-center w-[40%] h-full'>
                            <input type={'text'} placeholder={'Search...'}
                                   className={`${theme === 'light' ? 'bg-white' : 'bg-neutral-800'} shadow outline-none w-[60%] h-[50px] rounded-full align-middle px-4`}
                                   onChange={(e) => {
                                       dispatch(setSearch(e.currentTarget.value))
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
                                                          goals={filteredGoalsByYear!.filter((v) => v.year === date)}/>
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


