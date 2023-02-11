import React, {useContext, useEffect, useState} from 'react';
import Tile from "../../components/Tile";
import SortingPanel from "../../components/SortingPanel";
import GoalCreationPanel from "../../components/GoalCreationPanel";
import GoalEditingPanel from "../../components/GoalEditingPanel";
import {Api} from "../../App";
import {Goals} from "../../types";
import {CircularProgress} from "@mui/material";

const Main = () => {

    const api = useContext(Api)
    const [openGoalCreationPanel, setOpenGoalCreationPanel] = useState<boolean>(false);
    const [openGoalEditingPanel, setOpenGoalEditingPanel] = useState<boolean>(false);
    const [data, setData] = useState<Goals|undefined>(undefined);
    const [sorting, setSorting] = useState<number>(1);

    useEffect(()=>{
        (async ()=>{
            let response = await api.getGoals();
            setData(response);
        })()
    },[data]);

    function getPercent(arr: { name: string, state: boolean }[]) {
        let completed = 0;
        arr.forEach((v: { name: string, state: boolean }) => {
            if (v.state) completed++
        });
        return Math.round((completed * 100) / arr.length);
    }

    if(!data){
        return <div className='justify-center items-center  flex h-full w-full'>
            <CircularProgress />
        </div>
    } else return (
        <>
        <GoalCreationPanel state={openGoalCreationPanel} closeFunction={setOpenGoalCreationPanel}/>
        <GoalEditingPanel state={openGoalEditingPanel} closeFunction={setOpenGoalEditingPanel}/>
        <div className="absolute overflow-y-auto h-[100vh] w-[100vw] bg-slate-50">
            <header className="w-full shadow-md h-[5vh] flex items-center bg-white border-b-2 border-teal-500">
                <p className='ml-4 text-xl font-sans font-semibold'>Yearly Goal Tracker</p>
            </header>
            <div className='flex justify-between items-center py-4 h-24'>
                <div className='flex px-6 items-center justify-center relative w-[40%] h-full'>
                    <SortingPanel setSorting={setSorting} years={Object.keys(data)} />
                </div>
                <div className='flex grow justify-center'>
                    <button onClick={()=>setOpenGoalCreationPanel(true)}
                        className='select-none bg-teal-500 font-mono rounded-full h-16 w-16 text-white hover:scale-105 active:scale-100 text-3xl'>
                        <p className='rotate-45'>✕︎</p>
                    </button>
                </div>
                <div className='flex justify-center relative items-center w-[40%] h-full'>
                    <input type={'text'} placeholder={'Search...'} className='outline-none w-[60%] h-[70%] rounded-full align-middle px-4 border-2 border-teal-500'/>
                </div>
            </div>
            {
                data ? (
                    Object.keys(data).sort((a,b)=>+b-(+a)).map((v, i) => {
                        return <>
                            <div key={i} className='my-2 flex flex-row justify-center items-center'>
                                <div className='h-[1px] w-[40%] bg-gray-500'/>
                                <div className='mx-8'>{v}</div>
                                <div className='h-[1px] w-[40%] bg-gray-500'/>
                            </div>
                            <div key={i} className='p-6 flex flex-wrap gap-4 '>
                                {
                                    (()=>{
                                        if(sorting === 1){
                                            return data[v].map((v,i)=>{
                                                return <Tile key={i} name={v.name} steps={v.steps}
                                                             onClick={setOpenGoalEditingPanel}/>
                                            });
                                        } else if(sorting === 2){
                                            return data[v].slice(0).sort((a, b)=>{
                                                return getPercent(a.steps) - getPercent(b.steps)
                                            }).map((v,i)=>{
                                                return <Tile key={i} name={v.name} steps={v.steps}
                                                             onClick={setOpenGoalEditingPanel}/>
                                            })
                                        }else if(sorting === 3){
                                            return data[v].slice(0).sort((a, b)=>{
                                                return getPercent(b.steps) - getPercent(a.steps)
                                            }).map((v,i)=>{
                                                return <Tile key={i} name={v.name} steps={v.steps}
                                                             onClick={setOpenGoalEditingPanel}/>
                                            })
                                        }
                                    })()
                                }
                            </div>
                        </>
                    })
                ) : null
            }
        </div>
        </>
    );
}

export default Main;