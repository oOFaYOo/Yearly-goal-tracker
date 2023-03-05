import React from "react";
import Main from "./index";
import {Api} from "../../App";
import {fireEvent, render, screen, within} from "@testing-library/react";
import 'regenerator-runtime/runtime';
import {MemoryRouter} from "react-router-dom";
import {TestSuit} from "../../test-utils";
import {initialState} from "../../store/slice";
import {IGoal} from "../../types";

it('Main test', async () => {

    const Comp = (
        {filtering = 'not filtered', theme = 'light', stateOfEditingPanel = {open:false, data:undefined}}:
        {filtering?:string, theme?: 'light' | 'dark', stateOfEditingPanel?:{open:boolean, data: IGoal | undefined}}) => {
        return (
            TestSuit(
            <MemoryRouter>
                <Api.Provider value={{
                    getGoals: jest.fn().mockImplementation(() => {
                        return Promise.resolve({
                            isSuccessful: true,
                            isAuthorized: true,
                            statusCode: 200,
                            result: {
                                ghdjmf: {
                                    year: '2023',
                                    id: 'ghdjmf',
                                    name: 'Some 1',
                                    steps: [
                                        {
                                            name: 'Step 1',
                                            state: true
                                        },
                                        {
                                            name: 'Step 2',
                                            state: false
                                        },
                                    ]
                                },
                                hjkkgh:
                                    {
                                        year: '2021',
                                        id: 'hjkkgh',
                                        name: 'Some 2',
                                        steps: []
                                    }
                            }
                        })
                    }),
                    deleteGoal: jest.fn(),
                    addGoal: jest.fn(),
                    editGoal: jest.fn(),
                    signIn: jest.fn(),
                    signUp: jest.fn(),
                }
                }>
                    <Main setIsLoggedIn={() => {
                    }}/>
                </Api.Provider>
            </MemoryRouter>, {goalTracker: {...initialState, theme:theme, filtering:filtering, stateOfEditingPanel:stateOfEditingPanel}})
        )
    }

    const {container, rerender} = render(<Comp />)
    await Promise.resolve();
    rerender(<Comp />)

    rerender(<Comp filtering={'2023'}/>)

    fireEvent.click(container.getElementsByClassName('bg-teal-500 shadow select-none font-mono rounded-full h-14 w-14 text-white hover:scale-105 active:scale-100 text-3xl')[0]);
    rerender(<Comp theme={'dark'}/>)

    fireEvent.change(screen.getByPlaceholderText('Search...'), {target: {value: 'Some'}});
    rerender(<Comp />)

    fireEvent.click(container.getElementsByClassName('border-teal-400 mr-4 px-2 border-l-2')[0]);
    rerender(<Comp />)

    rerender(<Comp stateOfEditingPanel={{open: true, data: undefined}}/>)

})