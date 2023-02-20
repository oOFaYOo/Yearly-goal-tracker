import {IGoal} from "../types";

export class Goal implements IGoal{
    id: string;
    name:string;
    year:string;
    steps: {name:string, state:boolean}[];
    constructor(id:string, name:string, year:string, steps:string[]) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.steps = steps.map((v)=>{
            return {name:v, state:false}
        });
    }
}
