import React from "react";
import {Tooltip} from "@mui/material";

function percentColor(arr: { name: string, state: boolean }[]) {
    let completed = 0;
    arr.forEach((v: { name: string, state: boolean }) => {
        if (v.state) completed++
    });
    const percent = Math.round((completed * 100) / arr.length);
    let color;

    if (percent < 80) {
        color = 'bg-rose-500';
    } else if (percent >= 80 && percent < 100) {
        color = 'bg-yellow-400';
    } else if (percent === 100) color = 'bg-green-500'

    return {percent: percent, color: color};
}

const Tile = ({
                  name,
                  steps,
                  onClick,
                  deleteGoal
              }: { name: string, steps: { name: string, state: boolean }[], onClick: React.Dispatch<React.SetStateAction<boolean>>, deleteGoal?: () => {} }) => {

    const completed = percentColor(steps);

    return (
        <div
            className='hover:bg-white cursor-pointer shadow-md flex justify-between flex-col items-center grow min-w-[335px]
             max-w-[500px] h-[300px] rounded-lg border-2 border-teal-500 p-4'>
            <div className='w-full h-full flex justify-between flex-col items-center' onClick={() => onClick(true)}>
            <Tooltip title={name} arrow placement={"top"}>
                <p style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                }}
                   className={'max-w-[300px] text-lg font-semibold font-sans'}>
                    {name}
                </p>
            </Tooltip>
            <div className={'px-2 flex-row justify-between items-center flex h-[36px] w-full'}>
                <div className='h-1 mr-4 w-full bg-gray-600'>
                    <div className={'h-full ' + completed.color} style={{width: `${completed.percent}%`}}></div>
                </div>
                <p>{`${completed.percent}%`}</p>
            </div>
            <div className={'items-center grow py-1 flex max-h-[130px] w-full flex flex-col gap-y-1 overflow-y-auto'}>
                {steps.map((v, i) => {
                    return <Tooltip title={v.name} arrow placement={"top"} key={i}>
                        <p style={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}
                           className={v.state ? 'max-w-[300px] min-h-[36px] line-through' : 'max-w-[300px] min-h-[36px]'}>
                            {v.state ? v.name : '◆ ' + v.name}
                        </p>
                    </Tooltip>
                })}
            </div>
            </div>
            <div className='w-[50%] h-9 bg-rose-500 text-center mt-2 pt-1 select-none'>
                Delete goal
            </div>
        </div>
    )
}

export default Tile;