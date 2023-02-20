import React from "react";
import {IGoal} from "../../types";
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
    {year, goals, sorting, theme, setNeedUpdate, setStateOfEditingPanel}:
        { year: string, goals: IGoal[], sorting: number, theme: 'light' | 'dark',
            setNeedUpdate: React.Dispatch<React.SetStateAction<boolean>>,
            setStateOfEditingPanel:React.Dispatch<React.SetStateAction<{ open: boolean, data: IGoal | undefined }>>}) => {

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
                <div className='h-[1px] w-[40%] bg-gray-500'/>
                <div className='mx-8'>{year}</div>
                <div className='h-[1px] w-[40%] bg-gray-500'/>
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