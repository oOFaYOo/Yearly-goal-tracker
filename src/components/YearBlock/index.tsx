import React from "react";
import {IGoal, IYearBlock} from "../../types";
import Tile from "../Tile";

function getPercent(arr: { name: string, state: boolean }[]) {
    if (arr.length === 0) return 0;
    let completed = 0;
    arr.forEach((v: { name: string, state: boolean }) => {
        if (v.state) completed++
    });
    return Math.round((completed * 100) / arr.length);
}

const YearBlock = (
    {year, goals, sorting, theme, setNeedUpdate, setStateOfEditingPanel} : IYearBlock) => {

    let sortedGoals;

    if(sorting === 2){
        sortedGoals = goals.slice(0).sort((a, b) => {
            return getPercent(a.steps) - getPercent(b.steps)
        });
    } else if(sorting === 3){
        sortedGoals = goals.slice(0).sort((a, b) => {
            return getPercent(b.steps) - getPercent(a.steps)
        })
    } else sortedGoals = goals;

    return (
        <>
            <div className='my-2 flex flex-row justify-center items-center'>
                <div className={`${theme === 'light' ? 'bg-neutral-400' : 'bg-neutral-600'} h-[1px] w-[40%]`}/>
                <div className='mx-8'>{year}</div>
                <div className={`${theme === 'light' ? 'bg-neutral-400' : 'bg-neutral-600'} h-[1px] w-[40%]`}/>
            </div>
            <div className='p-6 flex flex-wrap gap-4 '>
                {
                   sortedGoals.map((v, i)=>{
                       return <Tile theme={theme} onUpdate={setNeedUpdate} key={i}
                                    year={v.year} name={v.name} id={v.id}
                                    percent={getPercent(v.steps)} steps={v.steps}
                                    openEditingPanel={setStateOfEditingPanel}/>
                   })
                }
            </div>
        </>

    )


}

export default YearBlock;