import {Goal} from "../classes/Goal";
import users from "../mock/users";
import goals from '../mock/goals';
import {IApiClient, IApiClientResult, IGoal} from "../types";

function delay(delayMs: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => resolve(), delayMs);
    })
}

class FakeApiClient implements IApiClient {
    private getUserFromCookies(): string {
        return document.cookie.split(";")[0].split("=")[1];
    }

    async getGoals(): Promise<IApiClientResult<{ [key: string]: IGoal }>> {
        await delay(500);
        const userId = this.getUserFromCookies();
        return {
            isSuccessful: true,
            isAuthorized: true,
            statusCode: 200,
            result: goals[userId]
        }
    }

    async deleteGoal(goalId: string): Promise<IApiClientResult<void>> {
        await delay(500);
        const userId = this.getUserFromCookies();
        delete goals[userId][goalId];
        return {
            isSuccessful: true,
            isAuthorized: true,
            statusCode: 200
        }
    }

    async addGoal(goal: string, year: string, steps: string[]): Promise<IApiClientResult<void>> {
        await delay(500);
        const userId = this.getUserFromCookies();
        const goalId = Math.round(Date.now()+(Math.random()*1000)).toString();
        goals[userId][goalId] = new Goal(goalId, goal, year, steps);
        return {
            isSuccessful: true,
            isAuthorized: true,
            statusCode: 200
        }
    }

    async editGoal(goalId: string, steps: { name: string, state: boolean }[]): Promise<IApiClientResult<void>> {
        await delay(500);
        const userId = this.getUserFromCookies();
        goals[userId][goalId].steps = steps
        return {
            isSuccessful: true,
            isAuthorized: true,
            statusCode: 200
        }
    }

    async signIn(login: string, password: string): Promise<IApiClientResult<string>> {
        await delay(500);
        let result: string;
        let successful = false;
        if (users[login]) {
            if (users[login].password === password) {
                result = users[login].id;
                successful = true;
            } else
                result = 'Incorrect password';
        } else
            result = 'User is not found';

        return {
            result: result,
            statusCode: successful ? 200 : 401,
            isAuthorized: successful,
            isSuccessful: successful
        };
    }

    async signUp(login: string, password: string): Promise<IApiClientResult<string>> {
        await delay(500);
        let result: string;
        let successful = false;
        if (users[login])
            result = 'User already exists';
        else {
            users[login] = {id: login, password: password};
            goals[login] = {};
            successful = true;
            result = 'Successfully registered';
        }
        return {
            result: result,
            statusCode: successful ? 200 : 409,
            isAuthorized: successful,
            isSuccessful: successful
        };
    }
}

export default FakeApiClient;
