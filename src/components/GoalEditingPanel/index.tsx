import React, {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PanoramaFishEyeRoundedIcon from '@mui/icons-material/PanoramaFishEyeRounded';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {Tooltip} from "@mui/material";

import {RootState} from "../../store";
import {setStateOfEditingPanel} from "../../store/slice";

import {Api} from "../../App";

const GoalEditingPanel = () => {

    const api = useContext(Api);
    const dispatch = useDispatch();
    const {theme, stateOfEditingPanel} = useSelector((state: RootState) => state.goalTracker);

    const [steps, setSteps] = useState(stateOfEditingPanel.data?.steps);
    const [newStep, setNewStep] = useState<string>('');

    const updateGoal = async () => {
        if (stateOfEditingPanel.data && steps) {
            const newSteps = [...steps!];
            if (newStep !== '') {
                newSteps.push({name: newStep, state: false});
            }
            const filteredSteps = newSteps.filter((v) => {
                return v.name !== ''
            });
            const response = await api.editGoal(stateOfEditingPanel.data?.id, filteredSteps);
            dispatch(setStateOfEditingPanel({open: false, data: undefined}));
        }
    };

    return <div className='absolute h-[100vh] w-[100vw] flex justify-center items-center'>
        <div
            onClick={() => updateGoal()}
            className='flex justify-center items-center z-10 bg-black/70 h-full w-full'></div>
        <form
            className={`${theme === 'light'
                ? 'bg-neutral-100 border-teal-500'
                : 'text-neutral-200 bg-neutral-800 border-neutral-700'} 
                  styled_scrollbar_hovered w-[35vw] absolute z-20 h-[80vh] max-h-[700px] border-r-[24px] min-w-[400px] 
              rounded-xl shadow-md flex flex-col pb-6 pt-12 px-6 gap-y-4`}>
            <div className='flex justify-between'>
                <h2 className='text-lg font-semibold text-center font-sans w-full p-2'>{stateOfEditingPanel.data?.name}</h2>
            </div>
            <div className='flex justify-evenly items-center'>
                <div className='bg-neutral-500 border border-neutral-500 h-[1px] w-[30%]'/>
                Steps to achieve
                <div className='bg-neutral-500 border border-neutral-500 h-[1px] w-[30%]'/>
            </div>
            <div className='flex items-center justify-center flex-row'>
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
                <input
                    className='rounded-lg shadow outline-none p-2 w-full'
                    style={{background: theme === 'light' ? '' : 'rgb(64 64 64 / 0.3)'}}
                    value={newStep} type={'text'} name={'newStep'} placeholder={'New step...'}
                    onChange={(e) => setNewStep(e.target.value)}
                />
            </div>
            {steps?.length === 0 ? null :
                <div className='styled_scrollbar overflow-y-auto flex flex-col w-full gap-y-4'>
                    {
                        steps?.map((v, i) => {
                            if (v.state) {
                                return <div className='flex items-center flex-row'>
                                    <CheckCircleOutlineIcon onClick={() => {
                                        const newSteps = [...steps];
                                        newSteps[i] = {...newSteps[i], state: false};
                                        setSteps(newSteps);
                                    }}
                                        className='mr-2 text-green-600 hover:cursor-pointer hover:scale-105 active:scale-100'/>
                                    <input value={v.name} onChange={(e) => {
                                        const newSteps = [...steps];
                                        newSteps[i] = {...newSteps[i], name: e.target.value};
                                        setSteps(newSteps);
                                    }}
                                           className={`${theme === 'light'
                                               ? 'focus:border-teal-500 border-teal-500/10'
                                               : 'focus:border-neutral-500 border-neutral-500/10'} 
                                               underline p-2 w-full bg-white/0 outline-none rounded-lg border-2`}/>
                                </div>
                            } else {
                                return <div className='flex items-center flex-row'>
                                    <PanoramaFishEyeRoundedIcon onClick={() => {
                                        const newSteps = [...steps];
                                        newSteps[i] = {...newSteps[i], state: true};
                                        setSteps(newSteps);
                                    }}
                                         className=
                                         {`${theme === 'light' ? 'text-neutral-400' : 'text-neutral-600'}
                                         mr-2 hover:text-green-600 hover:cursor-pointer hover:scale-105 active:scale-100`}
                                    />
                                    <input value={v.name} onChange={(e) => {
                                        const newSteps = [...steps];
                                        newSteps[i] = {...newSteps[i], name: e.target.value};
                                        setSteps(newSteps);
                                    }}
                                           className={`${theme === 'light'
                                               ? 'focus:border-teal-500 border-teal-500/10'
                                               : 'focus:border-neutral-500 border-neutral-500/10'} 
                                               p-2 w-full bg-white/0 outline-none rounded-lg border-2`}/>
                                </div>
                            }
                        })
                    }
                </div>
            }
            <div className='flex justify-center'>
                <button className={`${theme === 'light' ? 'bg-teal-500 text-white' : 'text-neutral-200 bg-neutral-700'} 
                hover:scale-105 active:scale-100 h-[40px] shadow rounded-lg w-[150px]`}
                        onClick={(e) => {
                            updateGoal()
                            e.preventDefault();
                        }}
                        type={'submit'}>Confirm
                </button>
            </div>
        </form>
    </div>
};

export default GoalEditingPanel;