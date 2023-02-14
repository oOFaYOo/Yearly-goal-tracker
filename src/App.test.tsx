import React from "react";
import {render} from "@testing-library/react";
import App from "./App";
import 'regenerator-runtime/runtime';
import {MemoryRouter} from "react-router-dom";

it('App test', ()=>{

    const Comp = () => {
        return (
            <MemoryRouter>
            <App />
            </MemoryRouter>
        )
    }

    const {container, rerender} = render(<Comp />)

})