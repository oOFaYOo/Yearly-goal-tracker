import React from "react";
import {fireEvent, render} from "@testing-library/react";
import YearBlock from "./index";
import {Provider} from "react-redux";
import {store} from "../../store";

it('YearBlock test', () => {

    const Comp = ({sorting}:{sorting: number}) => {
        return (
            <Provider store={store}>
                <YearBlock
                      year={'2023'}
                      goals={[{id:'', year:'', name:'', steps:[{name:'', state:true}]},{id:'', year:'', name:'', steps:[{name:'', state:false}]}]}
                      sorting={sorting}
                      setStateOfEditingPanel={()=>{}} />
            </Provider>
        )
    }

    const {container, rerender} = render(<Comp sorting={1} />)
    rerender(<Comp sorting={2} />)
    rerender(<Comp sorting={3} />)
})