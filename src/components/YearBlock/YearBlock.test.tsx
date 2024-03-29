import React from "react";

import {render} from "@testing-library/react";

import {initialState} from "../../store/slice";
import {TestSuit} from "../../test-utils";
import YearBlock from "./index";

it('YearBlock test', () => {

    const goals = [
        {id: '', year: '', name: '', steps: [{name: '', state: true}]},
        {id: '', year: '', name: '', steps: [{name: '', state: false}]},
        {id: '', year: '', name: '', steps: []}
    ];

    const Comp = ({sorting, theme = 'light'}: { sorting: number, theme?: 'light' | 'dark' }) => {
        return (
            TestSuit(
                <YearBlock year={'2023'} goals={goals}/>,
                {
                    goalTracker: {...initialState, sorting: sorting, theme: theme}
                })
        )
    }

    const {rerender} = render(<Comp sorting={1} />)
    rerender(<Comp sorting={2} theme={'dark'}/>)
    rerender(<Comp sorting={3}/>)
})