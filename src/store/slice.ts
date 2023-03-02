import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IGoalTrackerState} from "../types";

const initialState: IGoalTrackerState = {
    sorting: 1,
    filtering: 'not filtered',
    theme: localStorage.theme ? localStorage.theme : 'light',
    search: '',
    needUpdate: false,
}

export const goalTrackerSlice = createSlice({
    name: 'GoalTracker',
    initialState,
    reducers: {
        setSorting: (state, action: PayloadAction<number>) => {
            state.sorting = action.payload
        },
        setFiltering: (state, action: PayloadAction<string>) => {
            state.filtering = action.payload
        },
        setTheme : (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload
        },
        setSearch : (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setNeedUpdate : (state, action: PayloadAction<boolean>) => {
            state.needUpdate = action.payload
        },
    },
});

export const { setSorting, setFiltering, setTheme, setSearch, setNeedUpdate } = goalTrackerSlice.actions;

export default goalTrackerSlice.reducer;