import React from "react";
import AuthPage from "./index";
import {fireEvent, screen, render} from "@testing-library/react";

it('AuthPage test', async () => {

    jest.useFakeTimers();

    const Comp = () => {
        return (
               <AuthPage setAuthState={()=>{}}/>
        )
    }

    const {container, rerender} = render(<Comp/>)

    fireEvent.change(container.getElementsByClassName('rounded outline-none w-[70%] px-2 border-2 border-teal-500')[0], {target:{value:'1'}});
    fireEvent.change(container.getElementsByClassName('rounded outline-none w-[70%] px-2 border-2 border-teal-500')[1], {target:{value:'1'}});
    fireEvent.click(screen.getByText("Log in"));
    jest.advanceTimersByTime(3000);
    fireEvent.click(screen.getByText("Sign up"));
    fireEvent.change(container.getElementsByClassName('rounded outline-none w-[70%] px-2 border-2 border-teal-500')[0], {target:{value:'1'}});
    fireEvent.change(container.getElementsByClassName('rounded outline-none w-[70%] px-2 border-2 border-teal-500')[1], {target:{value:'1'}});
    fireEvent.click(screen.getByText("Register"));
    jest.advanceTimersByTime(3000);
    fireEvent.change(container.getElementsByClassName('rounded outline-none w-[70%] px-2 border-2 border-teal-500')[0], {target:{value:'1'}});
    fireEvent.change(container.getElementsByClassName('rounded outline-none w-[70%] px-2 border-2 border-teal-500')[1], {target:{value:'1'}});
    fireEvent.click(screen.getByText("Register"));
    jest.advanceTimersByTime(3000);
    fireEvent.click(screen.getByText("Sign in"));
    fireEvent.change(container.getElementsByClassName('rounded outline-none w-[70%] px-2 border-2 border-teal-500')[0], {target:{value:'1'}});
    fireEvent.change(container.getElementsByClassName('rounded outline-none w-[70%] px-2 border-2 border-teal-500')[1], {target:{value:'1'}});
    fireEvent.click(screen.getByText("Log in"));
    jest.advanceTimersByTime(3000);

    rerender(<Comp />)
    fireEvent.click(screen.getByText("Demo user"));
    jest.advanceTimersByTime(3000);
})