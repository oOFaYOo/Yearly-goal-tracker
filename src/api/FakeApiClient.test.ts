import FakeApiClient from "./FakeApiClient";

it('FakeApiClient class test', async ()=>{
    document.cookie = 'session=demouser';
    const api = new FakeApiClient();
    const response1 = await api.getGoals();
    const response2 = await api.addGoal('', '', ['']);
    const response3 = await api.editGoal('g456d5f6dg8rg6df5fd6fs3d2',[]);
    const response4 = await api.deleteGoal('g456d5f6dg8rg6df5fd6fs3d2');
    const response5 = await api.signIn('', '');
    const response6 = await api.signIn('123', '123');
    const response7 = await api.signIn('123', '0');
    const response8 = await api.signUp('', '');
    const response9 = await api.signUp('123', '123');
    document.cookie = 'session=; Max-Age=0';
})

export {}