import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import GoalEditingPanel from "./index";
import {Api} from '../../App'
import {Provider} from "react-redux";
import {store} from "../../store";

let someGoal = {
    id: '123',
    year:'2023',
    name:'123',
    steps:[
        { name:'1',
            state: false
        },
        { name:'2',
            state: false
        },
        { name:'3',
            state: true
        }
    ]
};

it('GoalEditingPanel test', ()=>{

    const Comp = () => {
        return (
            <Provider store={store}>
            <Api.Provider value={{
                getGoals: jest.fn(),
                deleteGoal: jest.fn(),
                addGoal: jest.fn(),
                editGoal: jest.fn().mockImplementation(() => {
                    return Promise.resolve({
                        isSuccessful: true,
                        isAuthorized: true,
                        statusCode: 200,
                        result: undefined
                    })
                }),
                signIn: jest.fn(),
                signUp: jest.fn(),
            }
            }>
                 <GoalEditingPanel />
            </Api.Provider>
            </Provider>
        )
    }

    const {container, rerender} = render(<Comp />)

    fireEvent.change(container.getElementsByClassName('underline p-2 w-full focus:border-teal-500 bg-white/0 outline-none rounded-lg border-2 border-teal-500/10')[0], {target:{value:'123'}});
    fireEvent.change(container.getElementsByClassName('p-2 w-full bg-white/0 focus:border-teal-500 outline-none rounded-lg border-2 border-teal-500/10')[0], {target:{value:'1234'}});
    fireEvent.click(container.getElementsByClassName('mr-2 text-green-600 text-black/20 hover:cursor-pointer hover:scale-105 active:scale-100')[0]);
    fireEvent.click(container.getElementsByClassName('mr-2 hover:text-green-600 hover:cursor-pointer hover:scale-105 active:scale-100')[0]);
    fireEvent.click(screen.getByText('Confirm'));

    rerender(<Comp />);
    fireEvent.click(container.getElementsByClassName('flex justify-center items-center z-10 bg-black/70 h-full w-full')[0]);

    rerender(<Comp />);
    fireEvent.change(screen.getByPlaceholderText('New step...'), {target:{value: 'some'}});
    fireEvent.click(container.getElementsByClassName('flex justify-center items-center z-10 bg-black/70 h-full w-full')[0]);

    rerender(<Comp />);
    fireEvent.change(screen.getByPlaceholderText('New step...'), {target:{value: 'some'}});
    fireEvent.click(container.getElementsByClassName('mr-2 hover:text-yellow-500 hover:cursor-pointer hover:scale-105 active:scale-100')[0]);

    rerender(<Comp />);
    fireEvent.change(screen.getByPlaceholderText('New step...'), {target:{value: 'some'}});
    fireEvent.click(screen.getByText('Confirm'));

})