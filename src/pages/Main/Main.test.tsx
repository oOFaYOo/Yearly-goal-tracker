import React from "react";
import Main from "./index";
import {Api} from "../../App";
import {fireEvent, render, screen, within} from "@testing-library/react";
import 'regenerator-runtime/runtime';
import {MemoryRouter} from "react-router-dom";

it('Main test', async () => {

    jest.useFakeTimers();

    const Comp = () => {
        return (
            <MemoryRouter>
                <Api.Provider value={{
                    getGoals: jest.fn().mockImplementation(() => {
                        return Promise.resolve({
                            isSuccessful: true,
                            isAuthorized: true,
                            statusCode: 200,
                            result: {
                                '2023': [
                                    {
                                        id: '123',
                                        year: '2023',
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
                                    }
                                ],
                                '2022': [],
                                '2021': [
                                    {
                                        id: '123',
                                        year: '2021',
                                        name: 'Some 2',
                                        steps: []
                                    }
                                ]
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
            </MemoryRouter>
        )
    }

    const {container, rerender, getByTestId, getByRole} = render(<Comp/>)

    await Promise.resolve();
    rerender(<Comp/>)

    fireEvent.mouseDown(getByTestId("select1").childNodes[0]);
    let listbox1 = within(getByRole('listbox'));
    fireEvent.click(listbox1.getByText("100 ← 0"));

    fireEvent.mouseDown(getByTestId("select1").childNodes[0]);
    let listbox2 = within(getByRole('listbox'));
    fireEvent.click(listbox2.getByText("0 → 100"));

    fireEvent.change(screen.getByPlaceholderText('Search...'), {target: {value: 'Some'}});
    fireEvent.click(screen.getByText('✕︎'));
    rerender(<Comp/>)
    fireEvent.click(container.getElementsByClassName('w-full h-full flex justify-between flex-col items-center')[0]);
    rerender(<Comp/>)
    fireEvent.click(getByTestId("switch").childNodes[0]);

    jest.advanceTimersByTime(300000);
    fireEvent.click(screen.getByText('Log out'));
})

it('Main test failed request', async () => {

    const Comp = () => {
        return (
            <MemoryRouter>
                <Api.Provider value={{
                    getGoals: jest.fn().mockImplementation(() => {
                        return Promise.resolve({
                            isSuccessful: false,
                            isAuthorized: false,
                            statusCode: 404,
                            result: undefined
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
            </MemoryRouter>
        )
    }

    const {container, rerender} = render(<Comp/>)

    await Promise.resolve();
    rerender(<Comp/>)
})