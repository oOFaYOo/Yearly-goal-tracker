import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IGoalTrackerState} from "../types";

const initialState: IGoalTrackerState = {
    sorting: 1,
    filtering: 'not filtered',
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

    },
});

export const { setSorting, setFiltering } = goalTrackerSlice.actions;

export default goalTrackerSlice.reducer;