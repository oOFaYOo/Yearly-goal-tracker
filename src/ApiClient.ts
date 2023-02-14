import goals from "./mock/goals";
import {Goal} from "./Goal";
import {users} from "./mock/users";
import {IGoals} from "./types";

export interface IApiClient {
    getGoals(): Promise<IGoals>;
    deleteGoal(id:string, year:string) : Promise<void>;
    addGoal(goal:string, year:string, steps:string[]) : Promise<void>;
    editGoal(year:string, id:string, steps:{name:string, state:boolean}[]) : Promise<void>;
    signIn(login: string, password: string) : Promise<{status: boolean, id?:string, errorMessage?:string}>;
}

class ApiClient implements IApiClient{
    getGoals():Promise<IGoals>{
       return new Promise((resolve)=>{
            setTimeout(()=>resolve(goals), 500);
        })
    }
    async deleteGoal(id:string, year:string):Promise<void>{
      goals[year] = goals[year].filter((v)=>v.id !== id);
      if(goals[year].length === 0){
          delete goals[year];
      }
    }
    async addGoal(goal:string, year:string, steps:string[]):Promise<void>{
        if(goals[year]){
            goals[year].push(new Goal(goal, year, steps));
        } else goals[year] = [new Goal(goal, year, steps)];

    }
    async editGoal(year:string, id:string, steps:{name:string, state:boolean}[]):Promise<void>{
      goals[year].forEach((v, i, arr)=>{
          if(v.id === id){
              arr[i].steps = steps
          }
      })
    }
    signIn(login: string, password: string) : Promise<{status: boolean, id?:string, errorMessage?:string}> {
        if (users[login]) {
            if (users[login].password === password) {
                return new Promise((resolve) => {
                    setTimeout(() => resolve({status: true, id: users[login].id}), 500);
                })
            } else return new Promise((resolve, reject) => {
                setTimeout(() => reject({status: false, errorMessage: 'Incorrect password'}), 500);
            })
        } else return new Promise((resolve,reject) => {
            setTimeout(() => reject({status: false, errorMessage: 'User is not found'}), 500);
        })
    }
}

export default ApiClient;