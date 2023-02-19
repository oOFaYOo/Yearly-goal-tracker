import React from "react";
import GoalCreationPanel from "./index";
import {fireEvent, render, screen} from "@testing-library/react";
import {Api} from '../../App'

it('GoalCreationPanel test', ()=>{

    const Comp = ({theme}:{theme:'light'|'dark'}) => {
        return (
            <Api.Provider value={{
                getGoals: jest.fn(),
                deleteGoal: jest.fn(),
                addGoal: jest.fn().mockImplementation(() => {
                    return Promise.resolve({
                        isSuccessful: true,
                        isAuthorized: true,
                        statusCode: 200,
                        result: undefined
                    })
                }),
                editGoal: jest.fn(),
                signIn: jest.fn(),
                signUp: jest.fn(),
            }
            }>
                <GoalCreationPanel theme={theme} closeFunction={()=>{}} setNeedUpdate={()=>{}} />
            </Api.Provider>
        )
    }

    const {container, rerender} = render(<Comp theme={'light'}/>)

    fireEvent.invalid(screen.getByPlaceholderText('Goal...'));
    fireEvent.change(screen.getByPlaceholderText('Goal...'), {target:{value: 'Goal name'}});
    fireEvent.change(screen.getByPlaceholderText('New step...'), {target:{value: 'some'}});
    fireEvent.click(container.getElementsByClassName('mr-2 hover:text-yellow-500 hover:cursor-pointer hover:scale-105 active:scale-100')[0]);
    fireEvent.change(screen.queryAllByPlaceholderText('Step...')[0], {target:{value: 'som'}});
    fireEvent.change(screen.queryAllByPlaceholderText('Step...')[0], {target:{value: ''}});
    fireEvent.invalid(screen.queryAllByPlaceholderText('Step...')[0]);
    fireEvent.click(container.getElementsByClassName('mr-2 hover:text-rose-500 text-black/20 hover:cursor-pointer hover:scale-105 active:scale-100')[0]);
    fireEvent.click(screen.getByText('Add new goal'));

    rerender(<Comp theme={'dark'}/>)
    fireEvent.change(screen.getByPlaceholderText('New step...'), {target:{value: 'some'}});
    fireEvent.click(container.getElementsByClassName('mr-2 hover:text-yellow-500 hover:cursor-pointer hover:scale-105 active:scale-100')[0]);
    fireEvent.click(container.getElementsByClassName('flex justify-center items-center z-10 bg-black/60 h-full w-full')[0]);

    rerender(<Comp theme={'dark'}/>)
    fireEvent.change(screen.getByPlaceholderText('Goal...'), {target:{value: 'Goal name'}});
    fireEvent.change(screen.getByPlaceholderText('New step...'), {target:{value: 'some'}});
    fireEvent.click(screen.getByText('Add new goal'));

})