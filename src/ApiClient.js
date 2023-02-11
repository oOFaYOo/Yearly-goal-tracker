import goals from "./mock/goals";

class ApiClient {
    getGoals(){
       return new Promise((resolve)=>{
            setTimeout(()=>resolve(goals), 500);
        })
    }
    deleteGoal(id, year){
      goals[year] = goals[year].filter((v)=>v.id !== id);

    }
}

export default ApiClient;