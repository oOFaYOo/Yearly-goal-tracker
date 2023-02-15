import React from "react";
import {fireEvent, render} from "@testing-library/react";
import Tile from "./index";
import {UserId} from "../../pages/Main";

it('Tile test', () => {

    const Comp = ({percent, theme}:{percent:number, theme:'light'|'dark'}) => {
        return (
            <UserId.Provider value={'demouser'}>
            <Tile name={'name'}
                  theme={theme}
                  year={'2023'}
                  id={'123'}
                  percent={percent}
                  steps={[{name:'name', state:true}, {name:'name', state:false}]}
                  onClick={()=>{}}
                  onUpdate={()=>{}} />
            </UserId.Provider>
        )
    }

    const {container, rerender} = render(<Comp percent={100} theme={'light'} />)
    fireEvent.click(container.getElementsByClassName('w-full h-full flex justify-between flex-col items-center')[0]);

    rerender(<Comp percent={80} theme={'light'} />)
    fireEvent.click(container.getElementsByClassName('text-gray-500/30 hover:text-rose-600 hover:scale-105 active:scale-100')[0]);

    rerender(<Comp percent={30} theme={'dark'} />)
})