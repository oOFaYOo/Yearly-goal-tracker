import React, {useContext} from "react";
import {Tooltip} from "@mui/material";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import {Api} from "../../App";
import {IGoal} from "../../types";
import {UserId} from "../../pages/Main";

function percentColor(percent: number) {
    if (percent < 80) {
        return 'bg-rose-500';
    } else if (percent >= 80 && percent < 100) {
        return 'bg-yellow-400';
    } else if (percent === 100) return 'bg-green-500'
}

const Tile = ({
                  name,
                  steps,
                  percent,
                  onClick,
                  onUpdate,
                  id,
                  year,
                  theme
              }:IGoal & {
    onUpdate:React.Dispatch<React.SetStateAction<boolean>>, theme: 'light'|'dark'
    percent: number, id: string, year: string, steps: { name: string, state: boolean }[],
    onClick: React.Dispatch<React.SetStateAction<{open:boolean, data:IGoal|undefined}>>
}) => {

    const api = useContext(Api);
    const userId = useContext(UserId);

    return (
        <div
            className={
            theme === 'light'
            ? 'styled_scrollbar_hovered hover:bg-white cursor-pointer shadow-md flex justify-between flex-col items-center grow min-w-[335px] max-w-[500px] h-[300px] rounded-lg border-2 border-teal-500 p-4'
            : 'styled_scrollbar_hovered hover:bg-gray-800 cursor-pointer shadow-md flex justify-between flex-col items-center grow min-w-[335px] max-w-[500px] h-[300px] rounded-lg border-2 border-teal-500 p-4'}>
            <div className='w-full flex flex-row justify-end'>
                <Tooltip title={'Delete goal'} arrow placement={"top"}>
                <CancelRoundedIcon onClick={()=>{
                        api.deleteGoal(userId, id, year);
                        onUpdate(true);
                    }
                } className='text-gray-500/30 hover:text-rose-600 hover:scale-105 active:scale-100' />
                </Tooltip>
            </div>
            <div className='w-full h-full flex justify-between flex-col items-center' onClick={
                () => onClick({open:true, data:{
                    id:id,
                    year: year,
                    name: name,
                    steps: steps
                    }})
            }>
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
            <div className={'px-2 flex-row justify-between items-center flex h-[24px] w-full'}>
                <div className='h-1 mr-4 w-full bg-gray-600'>
                    <div className={'h-full ' + percentColor(percent)} style={{width: `${percent}%`}}></div>
                </div>
                <p>{`${percent}%`}</p>
            </div>
            <div className={'styled_scrollbar items-center grow py-1 flex max-h-[130px] w-full flex flex-col gap-y-1 overflow-y-auto'}>
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
        </div>
    )
}

export default Tile;