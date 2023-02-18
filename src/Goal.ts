import {IGoal} from "./types";

export class Goal implements IGoal{
    id = Math.round(Date.now()+(Math.random()*1000)).toString();
    name:string;
    year:string;
    steps: {name:string, state:boolean}[];
    constructor(name:string, year:string, steps:string[]) {
        this.name = name;
        this.year = year;
        this.steps = steps.map((v)=>{
            return {name:v, state:false}
        });
    }
}
