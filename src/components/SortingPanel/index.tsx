import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {FormControl, InputLabel, MenuItem, Select, Switch} from "@mui/material";

import { setSorting, setFiltering, setTheme } from '../../store/slice';
import {RootState} from "../../store";

import {ISortingPanel} from "../../types";

const SortingPanel = ({ years }: ISortingPanel) => {

    const dispatch = useDispatch();
    const {theme} = useSelector((state: RootState) => state.goalTracker)

    return (
        <div className={'flex items-center justify-around relative w-full gap-2 h-full'}>
            <div className='flex flex-row items-center'><p>light</p>
                <Switch checked={localStorage.theme === 'dark'} color="default" data-testid={'switch'}
                        onChange={(e) => {
                            const theme = e.currentTarget.checked ? 'dark' : 'light';
                            localStorage.setItem('theme', theme)
                            dispatch(setTheme(theme));
                        }}
                />
                <p>dark</p></div>
            <FormControl className='w-[150px]'>
                <InputLabel id="demo-simple-select-label"
                            sx={theme === 'dark' ? {color: 'rgb(156 163 175)'} : {}}>Completed</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select1"
                    data-testid="select1"
                    value={undefined}
                    label="Completed"
                    sx={theme === 'dark' ? {color: 'rgb(156 163 175)', height:'50px', borderRadius:'25px'} : {height:'50px', borderRadius:'25px'}}
                    className={theme === 'light' ? 'min-w-[70px] bg-white shadow' : 'min-w-[70px] shadow bg-neutral-800'}
                    onChange={(e) => {
                        if (e.target.value !== undefined) dispatch(setSorting(+(e.target.value)))
                    }}
                >
                    <MenuItem value={1}>not sorted</MenuItem>
                    <MenuItem value={2}>0 → 100</MenuItem>
                    <MenuItem value={3}>100 → 0</MenuItem>
                </Select>
            </FormControl>
            <FormControl className='w-[150px]'>
                <InputLabel sx={theme === 'dark' ? {color: 'rgb(156 163 175)'} : {}}
                            id="demo-simple-select-label">Year</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select2"
                    data-testid="select2"
                    value={undefined}
                    sx={theme === 'dark' ? {color: 'rgb(156 163 175)', height:'50px', borderRadius:'25px'} : {height:'50px', borderRadius:'25px'}}
                    label="Year"
                    className={theme === 'light' ? 'min-w-[70px] bg-white shadow' : 'min-w-[70px] bg-neutral-800 shadow'}
                    onChange={(e) => {
                        if (e.target.value !== undefined){
                            dispatch(setFiltering(e.target.value))
                        }
                    }}
                >
                    <MenuItem value={'not filtered'}>not filtered</MenuItem>
                    {
                        years.map((v, i) => {
                            return <MenuItem key={i} value={v}>{v}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default SortingPanel;