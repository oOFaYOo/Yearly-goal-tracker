import React from "react";
import {render} from "@testing-library/react";
import Main from "./index";


it('Main test', async () => {
    jest.useFakeTimers()

    const Comp = () => {
        return (
           <Main />
        )
    }

    const {container, rerender} = render(<Comp />)

    await Promise.resolve();
    jest.advanceTimersByTime(2000);

})