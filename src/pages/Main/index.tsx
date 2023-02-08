import React from 'react';
import Tile from "../../components/Tile";

const Main = () => {

    return (
        <div className="absolute overflow-y-auto h-[100vh] w-[100vw] bg-slate-50">
            <header className="w-full h-[5vh] flex items-center border-b-2 border-teal-500">
                <p className='ml-4 text-xl font-sans font-semibold'>Yearly Goal Tracker</p>
            </header>
            <div className='flex justify-center items-center py-4'>
                <button
                    className='bg-teal-500 font-mono rounded-full h-16 w-16 hover:scale-105 active:scale-100 text-5xl'>
                    <p className='rotate-45'>✕︎</p>
                </button>
            </div>
            <div className='p-6 flex flex-wrap gap-4 '>
                <Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile />
            </div>
        </div>
    );
}

export default Main;