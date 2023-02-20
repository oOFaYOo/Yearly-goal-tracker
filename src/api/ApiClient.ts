import {IApiClient, IApiClientResult, IGoal} from "../types";
import axios from "axios";

class ApiClient implements IApiClient {
    // private apiUrl : string = "https://192.168.50.41:7221";
    private apiUrl: string = "https://api.goals:7221";

    // private apiUrl : string = "";

    async getGoals(): Promise<IApiClientResult<{ [key: string]: IGoal }>> {
        const response = await axios.get(`${this.apiUrl}/api/goals`, {
            headers: {
                "sessionId": document.cookie
            },
        });
        return {
            isSuccessful: response.status === 200,
            isAuthorized: response.status !== 401,
            statusCode: response.status,
            result: response.data
        }
    }

    async deleteGoal(goalId: string): Promise<IApiClientResult<void>> {
        const response = await axios.delete(`${this.apiUrl}/api/goals/${goalId}`, {
            headers: {
                "sessionId": document.cookie
            }
        });
        return {
            isSuccessful: response.status === 200,
            isAuthorized: response.status !== 401,
            statusCode: response.status,
            result: response.data
        }
    }

    async addGoal(goalName: string, year: string, steps: string[]): Promise<IApiClientResult<void>> {
        const response = await axios.put(
            `${this.apiUrl}/api/goals`,
            {goalName: goalName, year: year, steps: steps},
            {
                headers: {
                    "sessionId": document.cookie
                }
            });
        return {
            isSuccessful: response.status === 200,
            isAuthorized: response.status !== 401,
            statusCode: response.status,
            result: response.data
        }
    }

    async editGoal(goalId: string, steps: { name: string, state: boolean }[]): Promise<IApiClientResult<void>> {
        const response = await axios.post(
            `${this.apiUrl}/api/goals/${goalId}`,
            {
                steps: steps
            }, {
                headers: {
                    "sessionId": document.cookie
                }
            }
        );
        return {
            isSuccessful: response.status === 200,
            isAuthorized: response.status !== 401,
            statusCode: response.status,
            result: response.data
        }
    }

    async signIn(login: string, password: string): Promise<IApiClientResult<string>> {
        const response = await axios.post(
            `${this.apiUrl}/api/auth/sign_in`, {
                login: login,
                password: password
            });

        return {
            isSuccessful: response.status === 200,
            isAuthorized: response.status !== 401,
            statusCode: response.status,
            result: response.data
        }
    }

    async signUp(login: string, password: string): Promise<IApiClientResult<string>> {
        const response = await axios.post(
            `${this.apiUrl}/api/auth/sign_up`, {
                login: login,
                password: password
            });

        return {
            isSuccessful: response.status === 200,
            isAuthorized: response.status !== 401,
            statusCode: response.status,
            result: response.data
        }
    }
}

export default ApiClient;