
export interface Goals {
    [key: string]:{
        name: string;
        steps: {name:string, state:boolean}[]
    }[]
}