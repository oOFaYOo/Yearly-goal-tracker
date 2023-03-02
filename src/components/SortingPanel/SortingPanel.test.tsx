import React from "react";
import {fireEvent, render, screen, within} from "@testing-library/react";
import SortingPanel from "./index";
import {Provider} from "react-redux";
import {store} from "../../store";

it('SortingPanel test', () => {

    const Comp = ({theme}:{theme:'light'|'dark'}) => {
        return (
            <Provider store={store}>
            <SortingPanel years={['2023']} />
            </Provider>
        )
    }

    const {container, rerender, getByRole, getByTestId} = render(<Comp theme={'light'} />)

    fireEvent.mouseDown( getByTestId("select1").childNodes[0]);
    let listbox1 = within(getByRole('listbox'));
    fireEvent.click(listbox1.getByText("100 → 0"));

    fireEvent.mouseDown( getByTestId("select2").childNodes[0]);
    let listbox2 = within(getByRole('listbox'));
    fireEvent.click(listbox2.getByText("2023"));

    fireEvent.click( getByTestId("switch").childNodes[0]);

    rerender(<Comp theme={'dark'} />)

})