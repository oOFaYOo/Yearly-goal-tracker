import React from 'react';
import Tile from "../../components/Tile";
import SortingPanel from "../../components/SortingPanel";
import { Icon } from '@mui/material';

const Main = () => {

    return (
        <div className="absolute overflow-y-auto h-[100vh] w-[100vw] bg-slate-50">
            <header className="w-full shadow-md h-[5vh] flex items-center bg-white border-b-2 border-teal-500">
                <p className='ml-4 text-xl font-sans font-semibold'>Yearly Goal Tracker</p>
            </header>
            <div className='flex justify-between items-center py-4 h-24'>
                <div className='flex px-6 items-center justify-center relative w-[40%] h-full'>
                    <SortingPanel />
                </div>
                <div className='flex grow justify-center'>
                    <button
                        className='select-none bg-teal-500 font-mono rounded-full h-16 w-16 text-white hover:scale-105 active:scale-100 text-3xl'>
                        <p className='rotate-45'>✕︎</p>
                    </button>
                </div>
                <div className='flex justify-center relative items-center w-[40%] h-full'>
                    <input type={'text'} placeholder={'Search...'} className='outline-none w-[60%] h-[70%] rounded-full align-middle px-4 border-2 border-teal-500'/>
                </div>
            </div>
            <div className='my-2 flex flex-row justify-center items-center'>
                <div className='h-[1px] w-[40%] bg-black'></div>
                <div className='mx-8'>2023</div>
                <div className='h-[1px] w-[40%] bg-black'></div>
            </div>
            <div className='p-6 flex flex-wrap gap-4 '>
                <Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile />
            </div>
        </div>
    );
}

export default Main;