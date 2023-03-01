import React, {useContext, useState} from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Api} from "../../App";
import {Tooltip} from "@mui/material";
import {IGoalCreationPanel} from "../../types";

const GoalCreationPanel = ({setNeedUpdate, closeFunction, theme} : IGoalCreationPanel) => {

    const [steps, setSteps] = useState<string[]>([]);
    const [newStep, setNewStep] = useState<string>('');
    const api = useContext(Api);

    return <div className='absolute h-[100vh] w-[100vw] flex justify-center items-center'>
        <div onClick={() => {
            closeFunction(false)
        }} className='flex justify-center items-center z-10 bg-black/70 h-full w-full'></div>
        <form onSubmit={(e) => {
            (
                async () => {
                    const goal = (e.currentTarget.elements.namedItem('goal') as HTMLInputElement).value;
                    const year = (e.currentTarget.elements.namedItem('year') as HTMLInputElement).value;
                    const newStepUnfinished = (e.currentTarget.elements.namedItem('newStep') as HTMLInputElement).value;
                    if (newStepUnfinished !== '') {
                        steps.push(newStepUnfinished);
                    }
                    const response = await api.addGoal(goal, year, steps);
                    setNeedUpdate(true);
                    setSteps([]);
                    closeFunction(false);
                }
            )()
            e.preventDefault();
        }}
              className={`${theme === 'light' 
                  ? 'bg-neutral-100 border-teal-500' 
                  : 'text-neutral-200 bg-neutral-800 border-neutral-700'} 
                  styled_scrollbar_hovered w-[35vw] absolute z-20 h-[80vh] max-h-[700px] border-r-[24px] min-w-[400px] 
              rounded-xl shadow-md flex flex-col pb-6 pt-12 px-6 gap-y-4`}>
            <div className='flex justify-between'>
                <input name={'goal'} required onInvalid={(e) => {
                    e.currentTarget.setCustomValidity("");
                    if (!e.currentTarget.validity.valid) {
                        e.currentTarget.setCustomValidity("Fill in the goal name");
                    }
                }} className='flex shadow outline-none grow mr-2 p-2 rounded-lg'
                 style={{background: theme === 'light' ? '' : 'rgb(64 64 64 / 0.3)'}} type={'text'} placeholder={'Goal...'}/>
                <input name={'year'}
                       className='w-[100px] shadow outline-none p-2 rounded-lg'
                       style={{background: theme === 'light' ? '' : 'rgb(64 64 64 / 0.3)'}}
                       type={'number'} defaultValue={new Date().getFullYear()} placeholder={'Year...'}/>
            </div>
            <div className='flex justify-evenly items-center'>
                <div className='bg-neutral-500 border border-neutral-500 h-[1px] w-[30%]'/>
                Steps to achieve
                <div className='bg-neutral-500 border border-neutral-500 h-[1px] w-[30%]'/>
            </div>
            <div className='flex item-center flex-row'>
                <div className='pt-1.5'>
                    <Tooltip title={'Add new step'} arrow placement={'top'}>
                        <AddCircleOutlineIcon onClick={() => {
                            if (newStep !== '') {
                                const newSteps = [...steps];
                                newSteps.push(newStep);
                                setNewStep('');
                                setSteps(newSteps);
                            }
                        }}
                        className='mr-2 hover:text-yellow-500 hover:cursor-pointer hover:scale-105 active:scale-100'/>
                    </Tooltip>
                </div>
                <input
                    className='rounded-lg shadow outline-none p-2 w-full'
                    style={{background:theme === 'light' ? '' : 'rgb(64 64 64 / 0.3)'}}
                    value={newStep} type={'text'} name={'newStep'} placeholder={'New step...'}
                    onChange={(e) => setNewStep(e.target.value)}
                />
            </div>
            <div className='styled_scrollbar overflow-y-auto flex flex-col w-full gap-y-4'>
                {
                    steps.map((v, i) => {
                        return (
                            <div className='flex item-center flex-row' key={i}>
                                <div className='pt-1.5'>
                                    <DeleteOutlineIcon onClick={() => {
                                        const newSteps = [...steps];
                                        newSteps.splice(i, 1);
                                        setSteps(newSteps);
                                    }}

                                       className={`${theme === 'light' ? 'text-neutral-300' : 'text-neutral-500'} mr-2 hover:text-rose-500 hover:cursor-pointer hover:scale-105 active:scale-100`}/>
                                </div>
                                <input required onInvalid={(e) => {
                                    e.currentTarget.setCustomValidity("");
                                    if (!e.currentTarget.validity.valid) {
                                        e.currentTarget.setCustomValidity("Write goal step text or delete this step");
                                    }
                                }}
                                       className='rounded-lg outline-none p-2 w-full'
                                       style={{background:theme === 'light' ? '' : 'rgb(64 64 64 / 0.3)'}}
                                       onChange={(e) => {
                                           const newSteps = [...steps];
                                           newSteps[i] = e.target.value;
                                           setSteps(newSteps);
                                       }} value={v} name={'step' + `${i}`} type={'text'} placeholder={'Step...'}/>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex justify-center'>
                <button className={`${theme === 'light' ? 'bg-teal-500 text-white' : 'text-neutral-200 bg-neutral-700'} 
                hover:scale-105 active:scale-100 h-[40px] shadow rounded-lg w-[150px]`}
                        type={'submit'}>Add new goal
                </button>
            </div>
        </form>
    </div>
};

export default GoalCreationPanel;