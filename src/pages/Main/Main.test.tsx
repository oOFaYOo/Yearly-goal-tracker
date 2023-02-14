import React from "react";
import Main from "./index";
import {Api} from "../../App";
import {fireEvent, render, screen} from "@testing-library/react";

it('Main test', async () => {

    jest.useFakeTimers();

    const Comp = () => {
        return (
           <Api.Provider value={{
                    getGoals: jest.fn().mockImplementation(() => {
                        return Promise.resolve(
                            {
                                    '2023':[
                                        {
                                            id: '123',
                                            year:'2023',
                                            name:'Some 1',
                                            steps:[
                                               { name:'Step 1',
                                                   state: true
                                                },
                                               { name:'Step 2',
                                                    state: false
                                                },
                                            ]
                                        }
                                    ],
                                    '2022': [],
                                    '2021': [
                                        {
                                            id: '123',
                                            year:'2021',
                                            name:'Some 2',
                                            steps:[]
                                        }
                                    ]
                                }
                            )
                    }),
                    deleteGoal: jest.fn(),
                    addGoal: jest.fn(),
                    editGoal: jest.fn(),
                    signIn: jest.fn(),
                }
           }>
            <Main />
           </Api.Provider>
        )
    }

    const {container, rerender} = render(<Comp/>)

    await Promise.resolve();
    await Promise.resolve();
    rerender(<Comp />)
    fireEvent.change(screen.getByPlaceholderText('Search...'), {target:{value: 'Some'}});
    fireEvent.click(screen.getByText('✕︎'));
    rerender(<Comp />)
    fireEvent.click(container.getElementsByClassName('w-full h-full flex justify-between flex-col items-center')[0]);
    rerender(<Comp />)

    jest.advanceTimersByTime(300000);

})