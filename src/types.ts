
export interface IGoalTrackerState {
    sorting: number;
    filtering: string;
    theme: 'light' | 'dark';
    search: string;
    needUpdate: boolean;
    openGoalCreationPanel: boolean;
    stateOfEditingPanel: { open: boolean, data: IGoal | undefined };
}
export interface IGoals {
    [key: string]:{
        [key: string]:IGoal
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

export interface IApiClientResult<T> {
    isSuccessful: boolean;
    isAuthorized: boolean;
    statusCode: number;
    result?: T;
}

export interface IApiClient {
    getGoals(): Promise<IApiClientResult<{ [key: string]: IGoal }>>;
    deleteGoal(goalId:string) : Promise<IApiClientResult<void>>;
    addGoal(goalName:string, year:string, steps:string[]) : Promise<IApiClientResult<void>>;
    editGoal(goalId:string, steps:{name:string, state:boolean}[]) : Promise<IApiClientResult<void>>;
    signIn(login: string, password: string) : Promise<IApiClientResult<string>>;
    signUp(login: string, password: string) : Promise<IApiClientResult<string>>;
}

export interface ISortingPanel  {
    years: string[]
}

export interface ITile extends IGoal{
    percent: number
}

export interface IYearBlock {
    year: string,
    goals: IGoal[]
}

