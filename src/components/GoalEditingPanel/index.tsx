import React, {useContext, useState} from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PanoramaFishEyeRoundedIcon from '@mui/icons-material/PanoramaFishEyeRounded';
import {IGoal} from "../../types";
import {Api} from "../../App";

const GoalEditingPanel = ({data, setOpenState, theme}:
                              {data:IGoal|undefined,
                               theme: 'light'|'dark',
                               setOpenState:React.Dispatch<React.SetStateAction<{open:boolean, data:IGoal|undefined}>>}) => {

    const [steps, setSteps] = useState(data?.steps);
    const api = useContext(Api);

    return <div className='absolute h-[100vh] w-[100vw] flex justify-center items-center'>
        <div onClick={()=> {
            setOpenState({open:false, data: undefined});
        }}  className='flex justify-center items-center z-10 bg-black/60 h-full w-full'></div>
            <form className={theme === 'light'
                ? 'styled_scrollbar_hovered w-[35vw] absolute z-20 h-[80vh] max-h-[700px] border-r-[24px] min-w-[400px] bg-slate-100 rounded border-teal-500 shadow-md flex flex-col pb-6 pt-12 px-4 gap-y-4'
                : 'styled_scrollbar_hovered w-[35vw] absolute z-20 h-[80vh] max-h-[700px] border-r-[24px] min-w-[400px] bg-gray-800 text-gray-400 rounded border-teal-500 shadow-md flex flex-col pb-6 pt-12 px-4 gap-y-4'
            }>
                <div className='flex justify-between'>
                    <p className='text-lg font-semibold text-center font-sans w-full p-2'>{data?.name}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='h-[1px] w-[30%] bg-gray-500'/>
                    Steps to achieve
                    <div className='h-[1px] w-[30%] bg-gray-500'/>
                </div>
                <div className='styled_scrollbar overflow-y-auto flex flex-col w-full gap-y-4'>
                    {
                        steps?.map((v, i)=>{
                            if(v.state){
                                return <div className='flex item-center flex-row'>
                                            <div className='pt-1.5'>
                                                <CheckCircleOutlineIcon onClick={()=>{
                                                    const newSteps = [...steps];
                                                    newSteps[i].state = false;
                                                    setSteps(newSteps);
                                                }}
                                                className='mr-2 text-green-600 text-black/20 hover:cursor-pointer hover:scale-105 active:scale-100'/>
                                            </div>
                                            <div className='underline p-2 w-full'>{v.name}</div>
                                       </div>
                            } else {
                                return <div className='flex item-center flex-row'>
                                            <div className='pt-1.5'>
                                                <PanoramaFishEyeRoundedIcon onClick={()=>{
                                                    const newSteps = [...steps];
                                                    newSteps[i].state = true;
                                                    setSteps(newSteps);
                                                }}
                                                className={theme === 'light'
                                                    ? 'mr-2 hover:text-green-600 text-black/20 hover:cursor-pointer hover:scale-105 active:scale-100'
                                                    : 'mr-2 hover:text-green-600 text-white/20 hover:cursor-pointer hover:scale-105 active:scale-100'
                                                } />
                                            </div>
                                            <div className='p-2 w-full'>{v.name}</div>
                                       </div>
                            }
                        })
                    }
                </div>
                <div className='flex justify-center'>
                <button className='hover:scale-105 text-black active:scale-100 h-[40px] rounded w-[100px] bg-teal-500'
                        onClick={(e)=>{
                            if(data && steps)
                            api.editGoal(data?.year, data?.id, steps);
                            setOpenState({open: false, data: undefined});
                            e.preventDefault();
                        }}
                        type={'submit'}>Confirm</button>
                </div>
            </form>
       </div>
};

export default GoalEditingPanel;