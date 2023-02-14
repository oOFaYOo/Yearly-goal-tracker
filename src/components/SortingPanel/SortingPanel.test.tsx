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
    rerender(<Comp theme={'dark'} />)
})