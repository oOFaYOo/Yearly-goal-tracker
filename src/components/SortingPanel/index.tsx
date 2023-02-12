import React from "react";
import {FormControl, InputLabel, MenuItem, Select, Switch} from "@mui/material";

const SortingPanel = ({
                          years,
                          setSorting,
                          setFiltering
                      }: {
    years: string[], setSorting: React.Dispatch<React.SetStateAction<number>>,
    setFiltering: React.Dispatch<React.SetStateAction<number>>
}) => {

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
                        if (e.target.value !== undefined) setSorting(+(e.target.value))
                    }}
                >
                    <MenuItem value={1}>not sorted</MenuItem>
                    <MenuItem value={2}>0 → 100</MenuItem>
                    <MenuItem value={3}>100 ← 0</MenuItem>
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
                    onChange={(e) => {
                        if (e.target.value !== undefined) setFiltering(+(e.target.value))
                    }}
                >
                    <MenuItem value={1}>not filtered</MenuItem>
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