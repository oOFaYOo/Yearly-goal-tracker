import React, {useContext, useState} from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PanoramaFishEyeRoundedIcon from '@mui/icons-material/PanoramaFishEyeRounded';
import {IGoalEditingPanel} from "../../types";
import {Api} from "../../App";
import {Tooltip} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const GoalEditingPanel = ({data, setOpenState, theme}: IGoalEditingPanel) => {

    const [steps, setSteps] = useState(data?.steps);
    const [newStep, setNewStep] = useState<string>('');
    const api = useContext(Api);

    return <div className='absolute h-[100vh] w-[100vw] flex justify-center items-center'>
        <div onClick={() => {
            setOpenState({open: false, data: undefined});
        }} className='flex justify-center items-center z-10 bg-black/70 h-full w-full'></div>
        <form
            className='styled_scrollbar_hovered w-[35vw] absolute z-20 h-[80vh] max-h-[700px] border-r-[24px] min-w-[400px] rounded border-teal-500 shadow-md flex flex-col pb-6 pt-12 px-4 gap-y-4'
            style={{color:theme === 'light'? 'black' : 'rgb(228 228 231)', background:theme === 'light'? 'rgb(245 245 245)' : 'rgb(38 38 38)'}}
        >
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
                        <AddCircleOutlineIcon onClick={() => {
                            if (newStep !== '') {
                                const newSteps = [...steps!];
                                newSteps.push({name: newStep, state: false});
                                setNewStep('');
                                setSteps(newSteps);
                            }
                        }}
                             className='mr-2 hover:text-yellow-500 hover:cursor-pointer hover:scale-105 active:scale-100'
                        />
                    </Tooltip>
                </div>
                <input
                    className='rounded-lg outline-none p-2 w-full'
                    style={{background:theme === 'light' ? '' : 'rgb(64 64 64 / 0.7)'}}
                    value={newStep} type={'text'} name={'newStep'} placeholder={'New step...'}
                    onChange={(e) => setNewStep(e.target.value)}
                />
            </div>
            {steps?.length === 0 ? null :
                <div className='styled_scrollbar overflow-y-auto flex flex-col w-full gap-y-4'>
                    {
                        steps?.map((v, i) => {
                            if (v.state) {
                                return <div className='flex item-center flex-row'>
                                    <div className='pt-1.5'>
                                        <CheckCircleOutlineIcon onClick={() => {
                                            const newSteps = [...steps];
                                            newSteps[i].state = false;
                                            setSteps(newSteps);
                                        }}
                                            className='mr-2 text-green-600 text-black/20 hover:cursor-pointer hover:scale-105 active:scale-100'/>
                                    </div>
                                    <input value={v.name} onChange={(e) => {
                                        const newSteps = [...steps];
                                        newSteps[i].name = e.target.value;
                                        setSteps(newSteps);
                                    }}
                                           className='underline p-2 w-full focus:border-teal-500 bg-white/0 outline-none rounded-lg border-2 border-teal-500/10'/>
                                </div>
                            } else {
                                return <div className='flex item-center flex-row'>
                                    <div className='pt-1.5'>
                                        <PanoramaFishEyeRoundedIcon onClick={() => {
                                            const newSteps = [...steps];
                                            newSteps[i].state = true;
                                            setSteps(newSteps);
                                        }}
                                             className='mr-2 hover:text-green-600 hover:cursor-pointer hover:scale-105 active:scale-100'
                                             style={{color: theme === 'light' ? 'rgb(0 0 0 / 0.2)' : 'rgb(255 255 255 / 0.2)'}}
                                        />
                                    </div>
                                    <input value={v.name} onChange={(e) => {
                                        const newSteps = [...steps];
                                        newSteps[i].name = e.target.value;
                                        setSteps(newSteps);
                                    }}
                                           className='p-2 w-full bg-white/0 focus:border-teal-500 outline-none rounded-lg border-2 border-teal-500/10'/>
                                </div>
                            }
                        })
                    }
                </div>
            }
            <div className='flex justify-center'>
                <button className='hover:scale-105 text-black active:scale-100 h-[40px] rounded w-[100px] bg-teal-500'
                        onClick={(e) => {
                            (async () => {
                                if (data && steps) {
                                    const newSteps = [...steps!];
                                    if (newStep !== '') {
                                        newSteps.push({name: newStep, state: false});
                                    }
                                    const filteredSteps = newSteps.filter((v) => {
                                        return v.name !== ''
                                    });
                                    const response = await api.editGoal(data?.id, filteredSteps);
                                    setOpenState({open: false, data: undefined});
                                }
                            })()
                            e.preventDefault();
                        }}
                        type={'submit'}>Confirm
                </button>
            </div>
        </form>
    </div>
};

export default GoalEditingPanel;