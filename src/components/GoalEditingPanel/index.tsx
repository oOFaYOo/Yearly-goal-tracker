import React from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PanoramaFishEyeRoundedIcon from '@mui/icons-material/PanoramaFishEyeRounded';

const GoalEditingPanel = ({state, closeFunction}:{ state: boolean, closeFunction: React.Dispatch<React.SetStateAction<boolean>>}) => {

    return state ? ( <div className='absolute h-[100vh] w-[100vw] flex justify-center items-center'>
        <div onClick={()=> {
            closeFunction(false)
        }}  className='flex justify-center items-center z-10 bg-black/60 h-full w-full'></div>
            <form className='styled_scrollbar_hovered w-[35vw] absolute z-20 h-[80vh] border-r-[24px] min-w-[400px] bg-slate-100 rounded
            border-teal-500 shadow-md flex flex-col pb-6 pt-12 px-4 gap-y-4'>
                <div className='flex justify-between'>
                    <p className='text-lg font-semibold font-sans w-full p-2'>JJJjhkhkjhkh kjhkjhkhk kjhkhkjhkjhk ghghgjgj jggjgjgj kjhkhkjhkhk hkjhkhkh</p>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='h-[1px] w-[30%] bg-gray-500'/>
                    Steps to achieve
                    <div className='h-[1px] w-[30%] bg-gray-500'/>
                </div>
                <div className='styled_scrollbar overflow-y-auto flex flex-col w-full gap-y-4'>
                    <div className='flex item-center flex-row'>
                        <div className='pt-1.5'>
                            <PanoramaFishEyeRoundedIcon className='mr-2 hover:text-green-600 text-black/20 hover:cursor-pointer hover:scale-105 active:scale-100' />
                        </div>
                        <div className='p-2 w-full'>Ghfkdjfh ghgjhgjhgjh jhgjhgjhgjhg jhgjhgjhgjhgj jhgjhgjh dkfhkdjhfk ппоппорпорпо орпорпопопопо орпорпорпо kjdhfkjfhk ksdjfhk</div>
                    </div>
                    <div className='flex item-center flex-row'>
                        <div className='pt-1.5'>
                            <CheckCircleOutlineIcon className='mr-2 text-green-600 text-black/20 hover:cursor-pointer hover:scale-105 active:scale-100'/>
                        </div>
                        <div className='underline p-2 w-full'>Ghfkdjfh ghgjhgjhgjh jhgjhgjhgjhg jhgjhgjhgjhgj jhgjhgjh dkfhkdjhfk ппоппорпорпо орпорпопопопо орпорпорпо kjdhfkjfhk ksdjfhk</div>
                    </div>
                </div>
                <div className='flex justify-center'>
                <button className='hover:scale-105 active:scale-100 h-[40px] rounded w-[100px] bg-teal-500' type={'submit'}>Confirm</button>
                </div>
            </form>
       </div>
    ) : null
};

export default GoalEditingPanel;