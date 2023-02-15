
export interface IGoals {
    [key: string]:{
        [key: string]:IGoal[]
    }
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
        password:string,
    }
}

export interface IApiClient {
    getGoals(id:string): Promise<{ [key: string]: IGoal[] }>;
    deleteGoal(userId:string, goalId:string, year:string) : Promise<void>;
    addGoal(goal:string, userId:string, year:string, steps:string[]) : Promise<void>;
    editGoal(year:string, userId:string, goalId:string, steps:{name:string, state:boolean}[]) : Promise<void>;
    signIn(login: string, password: string) : Promise<{status: boolean, id?:string, message?:string}>;
    signUp(login: string, password: string) : Promise<{status: boolean, id?:string, message:string}>;
}

