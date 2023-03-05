import React from "react";
import Main from "./index";
import {Api} from "../../App";
import {fireEvent, render, screen, within} from "@testing-library/react";
import 'regenerator-runtime/runtime';
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../store";

it('Main test', async () => {

    jest.useFakeTimers();

    const Comp = ({failRequest = true}:{failRequest?:boolean}) => {
        return (
            <Provider store={store}>
            <MemoryRouter>
                <Api.Provider value={{
                    getGoals: jest.fn().mockImplementation(() => {
                        return Promise.resolve({
                            isSuccessful: failRequest,
                            isAuthorized: failRequest,
                            statusCode: failRequest ? 200 : 404,
                            result: failRequest ? {
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
                            } : undefined
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
            </Provider>
        )
    }

    const {container, rerender, getByTestId, getByRole} = render(<Comp/>)

    await Promise.resolve();
    rerender(<Comp/>)

    fireEvent.click(container.getElementsByClassName('bg-teal-500 shadow select-none font-mono rounded-full h-14 w-14 text-white hover:scale-105 active:scale-100 text-3xl')[0]);
    rerender(<Comp/>)

    fireEvent.change(screen.getByPlaceholderText('Search...'), {target: {value: 'Some'}});
    rerender(<Comp/>)

    fireEvent.click(container.getElementsByClassName('border-teal-400 mr-4 px-2 border-l-2')[0]);
    rerender(<Comp/>)

    rerender(<Comp failRequest={false}/>)

})