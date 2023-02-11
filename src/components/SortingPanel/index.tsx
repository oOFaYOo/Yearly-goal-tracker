import React from "react";
import {FormControl, InputLabel, MenuItem, Select, Switch} from "@mui/material";

const SortingPanel = ({years, setSorting}:{years:string[], setSorting:React.Dispatch<React.SetStateAction<number>>}) => {

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
                    onChange={(e) => {
                        // @ts-ignore
                        setSorting(e.target.value)
                    }}
                >
                    <MenuItem value={1}>not sorted</MenuItem>
                    <MenuItem value={2}>1 → 100</MenuItem>
                    <MenuItem value={3}>100 ← 1</MenuItem>
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
                ><MenuItem value={years.length}>not filtered</MenuItem>
                    {
                    years.map((v,i)=>{
                        return <MenuItem key={i} value={i}>{v}</MenuItem>
                    })
                }
                </Select>
            </FormControl>
        </div>
    )
}

export default SortingPanel;