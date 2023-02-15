import React from "react";
import {FormControl, InputLabel, MenuItem, Select, Switch} from "@mui/material";

const SortingPanel = ({
                          years,
                          setSorting,
                          setFiltering,
                          setTheme,
                          theme
                      }: {
    years: string[], setSorting: React.Dispatch<React.SetStateAction<number>>,
    setFiltering: React.Dispatch<React.SetStateAction<number>>, theme:'light'|'dark',
    setTheme: React.Dispatch<React.SetStateAction<'light'|'dark'>>
}) => {

    return (
        <div className={'flex items-center justify-around relative w-full gap-2 h-full'}>
            <div className='flex flex-row items-center'><p>light</p>
                <Switch color="default" data-testid={'switch'}
                    onChange={(e)=>{
                        setTheme(e.currentTarget.checked ? 'dark' : 'light');
                    }}
                />
                <p>dark</p></div>
            <FormControl className='w-[150px]'>
                <InputLabel id="demo-simple-select-label" sx={theme === 'dark' ? {color:'rgb(156 163 175)'} : {}}>Completed</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select1"
                    data-testid="select1"
                    value={undefined}
                    label="Completed"
                    sx={theme === 'dark' ? {color:'rgb(156 163 175)'} : {}}
                    className={theme === 'light' ? 'min-w-[70px]' : 'min-w-[70px] bg-gray-700'}
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
                <InputLabel sx={theme === 'dark' ? {color:'rgb(156 163 175)'} : {}} id="demo-simple-select-label">Year</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select2"
                    data-testid="select2"
                    value={undefined}
                    sx={theme === 'dark' ? {color:'rgb(156 163 175)'} : {}}
                    label="Year"
                    className={theme === 'light' ? 'min-w-[70px]' : 'min-w-[70px] bg-gray-700'}
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