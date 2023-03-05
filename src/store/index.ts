import {configureStore} from '@reduxjs/toolkit'
import goalTrackerReducer from './slice'

export const store = configureStore({
    reducer: {
        goalTracker: goalTrackerReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
