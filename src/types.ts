
export interface IGoals {
    [key: string]:IGoal[]
}

export interface IGoal {
    id: string,
    year: string,
    name: string;
    steps: {name:string, state:boolean}[]
}

export interface IUsers {
    [key: string]:{
        id:string,
        password:string
    }
}

export interface IApiClient {
    getGoals(): Promise<IGoals>;
    deleteGoal(id:string, year:string) : Promise<void>;
    addGoal(goal:string, year:string, steps:string[]) : Promise<void>;
    editGoal(year:string, id:string, steps:{name:string, state:boolean}[]) : Promise<void>;
    signIn(login: string, password: string) : Promise<{status: boolean, id?:string, message?:string}>;
    signUp(login: string, password: string) : Promise<{status: boolean, id?:string, message:string}>;
}

