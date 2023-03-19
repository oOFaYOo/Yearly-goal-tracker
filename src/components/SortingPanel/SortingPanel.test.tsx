import React from "react";
import {Provider} from "react-redux";

import {fireEvent, render, within} from "@testing-library/react";

import {store} from "../../store";
import SortingPanel from "./index";

it('SortingPanel test', () => {

    const Comp = () => {
        return (
            <Provider store={store}>
            <SortingPanel years={['2023']} />
            </Provider>
        )
    }

    const {getByRole, getByTestId} = render(<Comp />)

    fireEvent.mouseDown( getByTestId("select1").childNodes[0]);
    let listbox1 = within(getByRole('listbox'));
    fireEvent.click(listbox1.getByText("100 → 0"));

    fireEvent.mouseDown( getByTestId("select2").childNodes[0]);
    let listbox2 = within(getByRole('listbox'));
    fireEvent.click(listbox2.getByText("2023"));

    fireEvent.click( getByTestId("switch").childNodes[0]);

})