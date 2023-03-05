import {configureStore, PreloadedState} from '@reduxjs/toolkit'
import goalTrackerReducer from './slice'

export const store = configureStore({
    reducer: {
        goalTracker: goalTrackerReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: {
            goalTracker: goalTrackerReducer,
        },
        preloadedState
    })
}

export type AppStore = ReturnType<typeof setupStore>