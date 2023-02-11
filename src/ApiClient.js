import goals from "./mock/goals";

class ApiClient {
    getGoals (){
       return new Promise((resolve)=>{
            setTimeout(()=>resolve(goals), 500);
        })
    }
}

export default ApiClient;