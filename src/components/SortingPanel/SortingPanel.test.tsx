import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import SortingPanel from "./index";

it('SortingPanel test', () => {

    const Comp = ({theme}:{theme:'light'|'dark'}) => {
        return (
            <SortingPanel theme={theme} setSorting={()=>{}} years={['2023']} setTheme={()=>{}} setFiltering={()=>{}} />
        )
    }

    const {container, rerender} = render(<Comp theme={'light'} />)

    fireEvent.click(container.getElementsByClassName('MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input')[0]);
    // expect(container).toMatchSnapshot();
    rerender(<Comp theme={'dark'} />)


})