import React from "react";
import {fireEvent, render} from "@testing-library/react";
import YearBlock from "./index";

it('YearBlock test', () => {

    const Comp = ({sorting, theme}:{sorting: number, theme:'light'|'dark'}) => {
        return (
                <YearBlock
                      theme={theme}
                      year={'2023'}
                      goals={[{id:'', year:'', name:'', steps:[{name:'', state:true}]},{id:'', year:'', name:'', steps:[{name:'', state:false}]}]}
                      sorting={sorting}
                      setNeedUpdate={()=>{}}
                      setStateOfEditingPanel={()=>{}} />

        )
    }

    const {container, rerender} = render(<Comp sorting={1} theme={'light'} />)
    rerender(<Comp sorting={2} theme={'light'} />)
    rerender(<Comp sorting={3} theme={'dark'} />)
})