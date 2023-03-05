import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import {setupStore} from '../store'
import {IGoalTrackerState} from "../types";

export function TestSuit (children : JSX.Element, state: {goalTracker:IGoalTrackerState }) {
    const store = setupStore(state)
    return <Provider store={store}>{children}</Provider>
}