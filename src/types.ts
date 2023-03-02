import React from "react";
import YearBlock from "./components/YearBlock";

export interface IGoalTrackerState {
    sorting: number;
    filtering: string;
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

export interface IGoalCreationPanel  {
    theme: 'light' | 'dark',
    setNeedUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    closeFunction: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IGoalEditingPanel  {
    data: IGoal | undefined,
    theme: 'light' | 'dark',
    setOpenState: React.Dispatch<React.SetStateAction<{ open: boolean, data: IGoal | undefined }>>
}

export interface ISortingPanel  {
    years: string[],
    theme: 'light' | 'dark',
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

export interface ITile extends IGoal{
    theme: 'light' | 'dark',
    onUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    percent: number,
    openEditingPanel: React.Dispatch<React.SetStateAction<{ open: boolean, data: IGoal | undefined }>>
}

export interface IYearBlock {
    year: string,
    goals: IGoal[],
    sorting: number,
    theme: 'light' | 'dark',
    setNeedUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    setStateOfEditingPanel:React.Dispatch<React.SetStateAction<{ open: boolean, data: IGoal | undefined }>>
}

