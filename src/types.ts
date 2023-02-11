
export interface Goals {
    [key: string]:{
        id: string,
        year: string,
        name: string;
        steps: {name:string, state:boolean}[]
    }[]
}