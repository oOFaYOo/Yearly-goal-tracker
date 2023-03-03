import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IGoal, IGoalTrackerState} from "../types";

const initialState: IGoalTrackerState = {
    sorting: 1,
    filtering: 'not filtered',
    theme: localStorage.theme ? localStorage.theme : 'light',
    search: '',
    needUpdate: false,
    openGoalCreationPanel: false,
    stateOfEditingPanel: {
        open: false,
        data: undefined
    },
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
        setOpenGoalCreationPanel : (state, action: PayloadAction<boolean>) => {
            state.openGoalCreationPanel = action.payload
        },
        setStateOfEditingPanel : (state, action: PayloadAction<{ open: boolean, data: IGoal | undefined }> ) => {
            state.stateOfEditingPanel = action.payload
        }
    },
});

export const {
    setSorting,
    setFiltering,
    setTheme,
    setSearch,
    setNeedUpdate,
    setOpenGoalCreationPanel,
    setStateOfEditingPanel } = goalTrackerSlice.actions;

export default goalTrackerSlice.reducer;