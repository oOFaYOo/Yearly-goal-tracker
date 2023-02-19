import FakeApiClient from "./FakeApiClient";

it('FakeApiClient class test', async ()=>{
    document.cookie = 'session=demouser';
    const api = new FakeApiClient();
    const response1 = await api.getGoals();
    const response2 = await api.deleteGoal('');
    const response3 = await api.addGoal('', '', ['']);
    const response4 = await api.editGoal('',[]);
    const response5 = await api.signIn('', '');
    const response6 = await api.signIn('123', '123');
    const response7 = await api.signIn('123', '0');
    const response8 = await api.signUp('', '');
    const response9 = await api.signUp('123', '123');
    document.cookie = 'session=; Max-Age=0';
})

export {}