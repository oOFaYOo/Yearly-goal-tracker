import React from "react";
import Main from "./index";
import {Api} from "../../App";
import {fireEvent, render} from "@testing-library/react";

it('Main test', async () => {

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
                                            name:'Move to another country',
                                            steps:[
                                               { name:'Collect documents',
                                                   state: true
                                                },
                                               { name:'Prepare the cat',
                                                    state: false
                                                },
                                            ]
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
})