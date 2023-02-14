import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import GoalEditingPanel from "./index";

let someGoal = {
    id: '123',
    year:'2023',
    name:'Find a job in an international company',
    steps:[
        { name:'Get hired for a good job',
            state: false
        },
        { name:'Prepare for an interview',
            state: true
        }
    ]
};

it('GoalEditingPanel test', ()=>{

    const Comp = ({theme}:{theme:'light'|'dark'}) => {
        return (
            <GoalEditingPanel data={someGoal} theme={theme} setOpenState={()=>{}} />
        )
    }

    const {container, rerender} = render(<Comp theme={'light'}/>)

    fireEvent.click(container.getElementsByClassName('mr-2 text-green-600 text-black/20 hover:cursor-pointer hover:scale-105 active:scale-100')[0]);
    fireEvent.click(container.getElementsByClassName('mr-2 hover:text-green-600 text-black/20 hover:cursor-pointer hover:scale-105 active:scale-100')[0]);
    fireEvent.click(screen.getByText('Confirm'));

    rerender(<Comp theme={'dark'}/>)
    fireEvent.click(container.getElementsByClassName('flex justify-center items-center z-10 bg-black/60 h-full w-full')[0]);


})