import {Goal} from "./Goal";

it('Goal class test', ()=>{
    const goal = new Goal('id','name', '1', ['step'])
    expect(goal.name).toBe('name');
    expect(goal.year).toBe('1');
    expect(goal.steps[0].name).toBe('step');
})

export {}