import React from "react";
import GoalCreationPanel from "./index";
import {fireEvent, render, screen} from "@testing-library/react";
import { UserId } from "../../pages/Main";

it('GoalCreationPanel test', ()=>{

    const Comp = ({theme}:{theme:'light'|'dark'}) => {
        return (
            <UserId.Provider value={'demouser'}>
                <GoalCreationPanel theme={theme} closeFunction={()=>{}} setNeedUpdate={()=>{}} />
            </UserId.Provider>
        )
    }

    const {container, rerender} = render(<Comp theme={'light'}/>)

    fireEvent.invalid(screen.getByPlaceholderText('Goal...'));
    fireEvent.change(screen.getByPlaceholderText('Goal...'), {target:{value: 'Goal name'}});
    fireEvent.change(screen.getByPlaceholderText('Step...'), {target:{value: 'some'}});
    fireEvent.click(container.getElementsByClassName('mr-2 hover:text-yellow-500 hover:cursor-pointer hover:scale-105 active:scale-100')[0]);
    fireEvent.change(screen.queryAllByPlaceholderText('Step...')[1], {target:{value: 'som'}});
    fireEvent.change(screen.queryAllByPlaceholderText('Step...')[1], {target:{value: ''}});
    fireEvent.invalid(screen.queryAllByPlaceholderText('Step...')[1]);
    fireEvent.click(container.getElementsByClassName('mr-2 hover:text-rose-500 text-black/20 hover:cursor-pointer hover:scale-105 active:scale-100')[0]);
    fireEvent.click(screen.getByText('Add new goal'));

    rerender(<Comp theme={'dark'}/>)
    fireEvent.change(screen.getByPlaceholderText('Step...'), {target:{value: 'some'}});
    fireEvent.click(container.getElementsByClassName('mr-2 hover:text-yellow-500 hover:cursor-pointer hover:scale-105 active:scale-100')[0]);
    fireEvent.click(container.getElementsByClassName('flex justify-center items-center z-10 bg-black/60 h-full w-full')[0]);

})