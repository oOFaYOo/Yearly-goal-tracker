import React, {useMemo} from "react";
import {IYearBlock} from "../../types";
import Tile from "../Tile";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

function getPercent(arr: { name: string, state: boolean }[]) {
    if (arr.length === 0) return 0;
    let completed = 0;
    arr.forEach((v: { name: string, state: boolean }) => {
        if (v.state) completed++
    });
    return Math.round((completed * 100) / arr.length);
}

const YearBlock = ({year, goals} : IYearBlock) => {

    const {theme, sorting} = useSelector((state: RootState) => state.goalTracker)

    const sortedGoals = useMemo(()=>{
        if(sorting === 2){
            return goals.slice(0).sort((a, b) => {
                return getPercent(a.steps) - getPercent(b.steps)
            });
        } else if(sorting === 3){
            return goals.slice(0).sort((a, b) => {
                return getPercent(b.steps) - getPercent(a.steps)
            })
        } else return goals;
    }, [sorting, goals]);

    return (
        <>
            <div className='my-2 flex flex-row justify-center items-center'>
                <div className={`${theme === 'light' ? 'bg-neutral-400 border-neutral-400' : 'bg-neutral-600 border-neutral-600'} h-[1px] border w-[45%]`}/>
                <div className='text-neutral-500 mx-8'>{year}</div>
                <div className={`${theme === 'light' ? 'bg-neutral-400 border-neutral-400' : 'bg-neutral-600 border-neutral-600'} border h-[1px] w-[45%]`}/>
            </div>
            <div className='p-6 flex flex-wrap gap-4 '>
                {
                   sortedGoals.map((v, i)=>{
                       return <Tile key={i}
                                    year={v.year} name={v.name} id={v.id}
                                    percent={getPercent(v.steps)} steps={v.steps}/>
                   })
                }
            </div>
        </>

    )
}

export default YearBlock;