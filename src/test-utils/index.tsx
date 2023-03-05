import React from 'react'
import { Provider } from 'react-redux'
import {RootState} from '../store'
import {configureStore, PreloadedState} from "@reduxjs/toolkit";
import goalTrackerReducer from "../store/slice";

export function TestSuit (children : JSX.Element, preloadedState: PreloadedState<RootState>) {
    const store = configureStore({
        reducer: {
            goalTracker: goalTrackerReducer,
        },
        preloadedState
    })
    return <Provider store={store}>{children}</Provider>
}