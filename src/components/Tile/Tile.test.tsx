import React from "react";
import {fireEvent, render} from "@testing-library/react";
import Tile from "./index";
import {Api} from '../../App'
import {Provider} from "react-redux";
import {store} from "../../store";

it('Tile test', () => {

    const Comp = ({percent}:{percent:number}) => {
        return (
            <Provider store={store}>
            <Api.Provider value={{
                getGoals: jest.fn(),
                deleteGoal: jest.fn().mockImplementation(() => {
                    return Promise.resolve({
                        isSuccessful: true,
                        isAuthorized: true,
                        statusCode: 200,
                        result: undefined
                    })
                }),
                addGoal: jest.fn(),
                editGoal: jest.fn(),
                signIn: jest.fn(),
                signUp: jest.fn(),
            }
            }>
            <Tile name={'name'}
                  year={'2023'}
                  id={'123'}
                  percent={percent}
                  steps={[{name:'name', state:true}, {name:'name', state:false}]}/>
            </Api.Provider>
            </Provider>
        )
    }

    const {container, rerender} = render(<Comp percent={100} />)
    rerender(<Comp percent={80} />)
    rerender(<Comp percent={30} />)
    fireEvent.click(container.getElementsByClassName('text-neutral-500/30 hover:text-rose-600 hover:scale-105 active:scale-100')[0]);
    fireEvent.click(container.getElementsByClassName('w-full h-full flex justify-between flex-col items-center')[0]);

})