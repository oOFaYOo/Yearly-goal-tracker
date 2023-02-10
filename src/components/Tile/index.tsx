import React from "react";
import {Tooltip} from "@mui/material";

const Tile = ({
                  name,
                  steps,
                  onClick
              }: { name: string, steps: string[], onClick: React.Dispatch<React.SetStateAction<boolean>> }) => {

    return (
        <div
            className='hover:bg-white cursor-pointer flex shadow-md justify-between flex-col items-center grow min-w-[300px]
             max-w-[500px] h-[300px] rounded-lg border-2 border-teal-500 p-4' onClick={() => onClick(true)}>
            <Tooltip title={'Kbhbhbjhjv gf gfhgf hf hgfgfhfhgfhgfh hfhfhgfhgfhg'} arrow placement={"top"}>
                <p style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                }}
                   className={'max-w-[300px]'}>
                    {'Kbhbhbjhjv gf gfhgf hf hgfgf hjfhkgdj hdkjfhg kdjfhgkjdfhgkj dfh gkjdh kdjh kjdggf jhfhgfhgfh hfhfhgfhgfhg'}
                </p>
            </Tooltip>
            <div className={'px-2 flex-row justify-between items-center flex h-[36px] w-full'}>
                <div className='h-1 mr-4 w-full bg-gray-600'>
                    <div className='h-full bg-red-500' style={{width: '50%'}}></div>
                </div>
                <p>100%</p>
            </div>
            <div className={'items-center grow py-1 flex max-h-[205px] w-full flex flex-col gap-y-1 overflow-y-auto'}>
                <Tooltip title={'Kbhbhbjhjv gf gfhgf hf hgfgfhfhgfhgfh hfhfhgfhgfhg'} arrow placement={"top"}>
                    <p style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                       className={'max-w-[300px] min-h-[36px] line-through'}>
                        {'Kbhbhbjhjv gf gfhgf hf hgfgf hjfhkgdj hdkjfhg kdjfhgkjdfhgkj dfh gkjdh kdjh kjdggf jhfhgfhgfh hfhfhgfhgfhg'}
                    </p>
                </Tooltip>
                <Tooltip title={'Kbhbhbjhjv gf gfhgf hf hgfgfhfhgfhgfh hfhfhgfhgfhg'} arrow placement={"top"}>
                    <p style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                       className={'max-w-[300px] min-h-[36px]'}>
                        {'◆ Kbhbhbjhjv gf gfhgf hf hgfgf hjfhkgdj hdkjfhg kdjfhgkjdfhgkj dfh gkjdh kdjh kjdggf jhfhgfhgfh hfhfhgfhgfhg'}
                    </p>
                </Tooltip>
                <Tooltip title={'Kbhbhbjhjv gf gfhgf hf hgfgfhfhgfhgfh hfhfhgfhgfhg'} arrow placement={"top"}>
                    <p style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                       className={'max-w-[300px] min-h-[36px]'}>
                        {'◆ Kbhbhbjhjv gf gfhgf hf hgfgf hjfhkgdj hdkjfhg kdjfhgkjdfhgkj dfh gkjdh kdjh kjdggf jhfhgfhgfh hfhfhgfhgfhg'}
                    </p>
                </Tooltip>
                <Tooltip title={'Kbhbhbjhjv gf gfhgf hf hgfgfhfhgfhgfh hfhfhgfhgfhg'} arrow placement={"top"}>
                    <p style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                       className={'max-w-[300px] min-h-[36px] line-through'}>
                        {'Kbhbhbjhjv gf gfhgf hf hgfgf hjfhkgdj hdkjfhg kdjfhgkjdfhgkj dfh gkjdh kdjh kjdggf jhfhgfhgfh hfhfhgfhgfhg'}
                    </p>
                </Tooltip>
                <Tooltip title={'Kbhbhbjhjv gf gfhgf hf hgfgfhfhgfhgfh hfhfhgfhgfhg'} arrow placement={"top"}>
                    <p style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                       className={'max-w-[300px] min-h-[36px]'}>
                        {'◆ Kbhbhbjhjv gf gfhgf hf hgfgf hjfhkgdj hdkjfhg kdjfhgkjdfhgkj dfh gkjdh kdjh kjdggf jhfhgfhgfh hfhfhgfhgfhg'}
                    </p>
                </Tooltip>
                <Tooltip title={'Kbhbhbjhjv gf gfhgf hf hgfgfhfhgfhgfh hfhfhgfhgfhg'} arrow placement={"top"}>
                    <p style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                       className={'max-w-[300px] min-h-[36px]'}>
                        {'◆ Kbhbhbjhjv gf gfhgf hf hgfgf hjfhkgdj hdkjfhg kdjfhgkjdfhgkj dfh gkjdh kdjh kjdggf jhfhgfhgfh hfhfhgfhgfhg'}
                    </p>
                </Tooltip>
                <Tooltip title={'Kbhbhbjhjv gf gfhgf hf hgfgfhfhgfhgfh hfhfhgfhgfhg'} arrow placement={"top"}>
                    <p style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                       className={'max-w-[300px] min-h-[36px] line-through'}>
                        {'Kbhbhbjhjv gf gfhgf hf hgfgf hjfhkgdj hdkjfhg kdjfhgkjdfhgkj dfh gkjdh kdjh kjdggf jhfhgfhgfh hfhfhgfhgfhg'}
                    </p>
                </Tooltip>
                <Tooltip title={'Kbhbhbjhjv gf gfhgf hf hgfgfhfhgfhgfh hfhfhgfhgfhg'} arrow placement={"top"}>
                    <p style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                       className={'max-w-[300px] min-h-[36px]'}>
                        {'◆ Kbhbhbjhjv gf gfhgf hf hgfgf hjfhkgdj hdkjfhg kdjfhgkjdfhgkj dfh gkjdh kdjh kjdggf jhfhgfhgfh hfhfhgfhgfhg'}
                    </p>
                </Tooltip>
                <Tooltip title={'Kbhbhbjhjv gf gfhgf hf hgfgfhfhgfhgfh hfhfhgfhgfhg'} arrow placement={"top"}>
                    <p style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                       className={'max-w-[300px] min-h-[36px]'}>
                        {'◆ Kbhbhbjhjv gf gfhgf hf hgfgf hjfhkgdj hdkjfhg kdjfhgkjdfhgkj dfh gkjdh kdjh kjdggf jhfhgfhgfh hfhfhgfhgfhg'}
                    </p>
                </Tooltip>
            </div>
        </div>
    )
}

export default Tile;