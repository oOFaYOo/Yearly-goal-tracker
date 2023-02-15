import {Goal} from "./Goal";
import users from "./mock/users";
import goals from './mock/goals';
import {IApiClient, IGoal, IGoals} from "./types";

class ApiClient implements IApiClient{
    getGoals(id:string):Promise<{ [key: string]: IGoal[] }>{
       return new Promise((resolve)=>{
            setTimeout(()=>resolve(goals[id]), 500);
        })
    }
    async deleteGoal(userId:string, goalId:string, year:string):Promise<void>{
      goals[userId][year] = goals[userId][year].filter((v)=>v.id !== goalId);
      if(goals[userId][year].length === 0){
          delete goals[userId][year];
      }
    }
    async addGoal(goal:string, userId:string, year:string, steps:string[]):Promise<void>{
        if(goals[userId][year]){
            goals[userId][year].push(new Goal(goal, year, steps));
        } else goals[userId][year] = [new Goal(goal, year, steps)];

    }
    async editGoal(year:string, userId:string, goalId:string, steps:{name:string, state:boolean}[]):Promise<void>{
        goals[userId][year].forEach((v, i, arr)=>{
          if(v.id === goalId){
              arr[i].steps = steps
          }
      })
    }
    async signIn(login: string, password: string) : Promise<{status: boolean, id?:string, message?:string}> {
        if (users[login]) {
            if (users[login].password === password) {
                return new Promise((resolve) => {
                    setTimeout(() => resolve({status: true, id: users[login].id}), 500);
                })
            } else return new Promise((resolve, reject) => {
                setTimeout(() => reject({status: false, message: 'Incorrect password'}), 500);
            })
        } else return new Promise((resolve,reject) => {
            setTimeout(() => reject({status: false, message: 'User is not found'}), 500);
        })
    }
    async signUp(login: string, password: string): Promise<{status: boolean, id?:string, message:string}> {
        if(users[login]){
            return new Promise((resolve,reject) => {
                setTimeout(() => reject({status: false, message: 'User already exists'}), 500);
            })
        } else {
            const id = Math.round(Date.now()+(Math.random()*1000)).toString()+login;
            users[login] = {id:id, password:password};
            goals[id] = {};
            return new Promise((resolve) => {
                setTimeout(() => resolve({status: false, message:'Successfully registered'}), 500);
            })
        }
    }
}

export default ApiClient;