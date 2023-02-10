import React from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const GoalCreationPanel = ({state, closeFunction}:{ state: boolean, closeFunction: React.Dispatch<React.SetStateAction<boolean>>}) => {

    return state ? ( <div className='absolute h-[100vh] w-[100vw] flex justify-center items-center'>
            <div onClick={()=> {
                closeFunction(false)
            }}  className='flex justify-center items-center z-10 bg-black/60 h-full w-full'></div>
            <form className='w-[35vw] absolute z-20 h-[80vh] border-r-[24px] min-w-[400px] bg-slate-100 rounded
            border-teal-500 shadow-md flex flex-col pb-6 pt-12 px-4 gap-y-4'>
                <div className='flex justify-between'>
                <input name={'goal'} className='flex grow mr-2 p-2 rounded' type={'text'} placeholder={'Goal...'}/>
                <input name={'date'} className='w-[100px] p-2 rounded' type={'number'} min={1950} defaultValue={new Date().getFullYear()} placeholder={'Year...'}/>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='h-[1px] w-[30%] bg-gray-500'/>
                    Steps to achieve
                    <div className='h-[1px] w-[30%] bg-gray-500'/>
                </div>
                <div className='flex item-center flex-row'>
                    <div className='pt-1.5'>
                        <AddCircleOutlineIcon className='mr-2 hover:text-yellow-500 hover:cursor-pointer hover:scale-105 active:scale-100'/>
                    </div>
                    <input className='rounded outline-none p-2 w-full' name={'new_step'} type={'text'} placeholder={'Step...'}/>
                </div>
                <div className='overflow-y-auto flex flex-col w-full gap-y-4'>
                    <div className='flex item-center flex-row'>
                        <div className='pt-1.5'>
                            <DeleteOutlineIcon className='mr-2 hover:text-rose-500 text-black/20 hover:cursor-pointer hover:scale-105 active:scale-100'/>
                        </div>
                        <input className='rounded outline-none p-2 w-full' name={'step'} type={'text'} placeholder={'Step...'}/>
                    </div>
                </div>
                <div className='flex justify-center'>
                <button className='hover:scale-105 active:scale-100 h-[40px] rounded w-[100px] bg-teal-500' type={'submit'}>Add</button>
                </div>
            </form>
        </div>
    ) : null
};

export default GoalCreationPanel;