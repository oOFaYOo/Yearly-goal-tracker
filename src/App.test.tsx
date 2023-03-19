import React from "react";
import {MemoryRouter} from "react-router-dom";
import {render} from "@testing-library/react";
import 'regenerator-runtime/runtime';

import App from "./App";

it('App test', ()=>{

    const Comp = () => {
        return (
            <MemoryRouter>
            <App />
            </MemoryRouter>
        )
    }

    render(<Comp />)
})