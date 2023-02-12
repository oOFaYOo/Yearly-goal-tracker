import goals from "./mock/goals";
import {Goal} from "./Goal";

class ApiClient {
    getGoals(){
       return new Promise((resolve)=>{
            setTimeout(()=>resolve(goals), 500);
        })
    }
    deleteGoal(id:string, year:string){
      goals[year] = goals[year].filter((v)=>v.id !== id);
    }
    addGoal(goal:string, year:string, steps:string[]){
      goals[year].push(new Goal(goal, year, steps));
    }
    editGoal(year:string, id:string, steps:{name:string, state:boolean}[]){
      goals[year].forEach((v, i, arr)=>{
          if(v.id === id){
              arr[i].steps = steps
          }
      })
    }
}

export default ApiClient;