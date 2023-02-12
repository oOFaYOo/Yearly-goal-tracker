
export interface IGoals {
    [key: string]:IGoal[]
}

export interface IGoal {
    id: string,
    year: string,
    name: string;
    steps: {name:string, state:boolean}[]
}