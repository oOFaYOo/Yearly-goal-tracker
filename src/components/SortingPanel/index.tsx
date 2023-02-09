import React from "react";
import {FormControl, InputLabel, MenuItem, Select, Switch} from "@mui/material";

const SortingPanel = ({years}:{years?:number[]}) => {

    return (
        <div className='flex items-center justify-around relative w-full gap-2 h-full'>
            <div className='flex flex-row items-center'><p>light</p>
            <Switch color="default"
                    // checked={}
                    // onChange={(e)=>{e.currentTarget.checked}}
            />
                <p>dark</p></div>
            <FormControl className='w-[150px]'>
                <InputLabel id="demo-simple-select-label">Completed</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={undefined}
                    label="Completed"
                    className='min-w-[70px]'
                    onChange={() => {
                    }}
                >
                    <MenuItem value={10}>1 → 100</MenuItem>
                    <MenuItem value={20}>100 ← 1</MenuItem>
                    <MenuItem value={30}>not sorted</MenuItem>
                </Select>
            </FormControl>
            <FormControl className='w-[150px]'>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={undefined}
                    label="Year"
                    className='min-w-[70px]'
                    onChange={() => {
                    }}
                >
                    <MenuItem value={10}>2023</MenuItem>
                    <MenuItem value={20}>2022</MenuItem>
                    <MenuItem value={30}>2021</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default SortingPanel;