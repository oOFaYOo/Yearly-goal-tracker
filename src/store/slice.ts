import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IGoalTrackerState} from "../types";

const initialState: IGoalTrackerState = {
    sorting: 1,
    filtering: 'not filtered',
    theme: localStorage.theme ? localStorage.theme : 'light',
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
    },
});

export const { setSorting, setFiltering, setTheme } = goalTrackerSlice.actions;

export default goalTrackerSlice.reducer;