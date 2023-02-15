import React, {useContext, useState} from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PanoramaFishEyeRoundedIcon from '@mui/icons-material/PanoramaFishEyeRounded';
import {IGoal} from "../../types";
import {Api} from "../../App";
import {UserId} from "../../pages/Main";
import {Tooltip} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const GoalEditingPanel = ({data, setOpenState, theme}:
                              {data:IGoal|undefined,
                               theme: 'light'|'dark',
                               setOpenState:React.Dispatch<React.SetStateAction<{open:boolean, data:IGoal|undefined}>>}) => {

    const [steps, setSteps] = useState(data?.steps);
    const [newStep, setNewStep] = useState<string>('');
    const api = useContext(Api);
    const id = useContext(UserId);

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
                <div className='flex item-center flex-row'>
                    <div className='pt-1.5'>
                        <Tooltip title={'Add new step'} arrow placement={'top'}>
                            <AddCircleOutlineIcon onClick={()=>{
                                if(newStep !== ''){
                                    const newSteps = [...steps!];
                                    newSteps.push({name: newStep, state:false});
                                    setNewStep('');
                                    setSteps(newSteps);
                                }
                            }}
                                                  className={theme === 'light'
                                                      ? 'mr-2 hover:text-yellow-500 hover:cursor-pointer hover:scale-105 active:scale-100'
                                                      : 'mr-2 hover:text-yellow-500 text-white/50 hover:cursor-pointer hover:scale-105 active:scale-100'
                                                  }/>
                        </Tooltip>
                    </div>
                    <input className={theme === 'light' ? 'rounded-lg outline-none p-2 w-full' : 'rounded-lg outline-none p-2 w-full bg-gray-700'}
                           value={newStep} type={'text'} name={'newStep'} placeholder={'New step...'}
                           onChange={(e)=> setNewStep(e.target.value)}
                    />
                </div>
                {steps?.length === 0 ? null :
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
                                        <input value={v.name} onChange={(e)=>{
                                            const newSteps = [...steps];
                                            newSteps[i].name = e.target.value;
                                            setSteps(newSteps);
                                        }} className='underline p-2 w-full focus:border-teal-500 bg-white/0 outline-none rounded-lg border-2 border-teal-500/10'/>
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
                                        <input value={v.name} onChange={(e)=>{
                                            const newSteps = [...steps];
                                            newSteps[i].name = e.target.value;
                                            setSteps(newSteps);
                                        }} className='p-2 w-full bg-white/0 focus:border-teal-500 outline-none rounded-lg border-2 border-teal-500/10'/>
                                    </div>
                                }
                            })
                        }
                    </div>
                }
                <div className='flex justify-center'>
                <button className='hover:scale-105 text-black active:scale-100 h-[40px] rounded w-[100px] bg-teal-500'
                        onClick={(e)=>{
                            if(data && steps)
                            api.editGoal(data?.year, id, data?.id, steps.filter((v)=> {
                                return v.name !== ''
                            }));
                            setOpenState({open: false, data: undefined});
                            e.preventDefault();
                        }}
                        type={'submit'}>Confirm</button>
                </div>
            </form>
       </div>
};

export default GoalEditingPanel;