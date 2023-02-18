const express = require('express')
const fs = require('fs');
const http = require("http");
const app = express();

app.use(express.static('./build'));

app.get('/api/yearly_goal_tracker/main/:id', function (req, res) {
    const stream = fs.createReadStream('./data/goals.json');
    let goals = '';
    stream.on('data',(chunk)=>{goals = goals + chunk});
    stream.on('end',()=>{
        let a = JSON.parse(goals);
        let goalsOfUser = a[req.params.id];
        res.status(200).send(goalsOfUser);
    });
})

app.delete('/api/yearly_goal_tracker/main/delete_goal/:userId/:year/:goalId', function (req, res) {
    const readableStream = fs.createReadStream('./data/goals');
    let goalsJSON = '';
    readableStream.on('data',(chunk)=>{goalsJSON = goalsJSON + chunk});
    readableStream.on('end',()=>{
        let goals = JSON.parse(goalsJSON);
        if(!goals[req.params.userId][req.params.year]){
            res.statusCode = 404;
            res.end('Not found');
        }
        goals[req.params.userId][req.params.year] = goals[req.params.userId][req.params.year].filter((v)=>v.id !== req.params.goalId);
        if(goals[req.params.userId][req.params.year].length === 0){
            delete goals[req.params.userId][req.params.year];
        }
        readableStream.close();
        const writableStream = fs.createWriteStream('./data/goals');
        writableStream.write(JSON.stringify(goals));
        writableStream.on('finish', ()=>{
            res.statusCode = 200;
            res.end();
        });
    });
})

app.put('/api/yearly_goal_tracker/main/add_goal/:userId/:year', function (req, res) {
    const readableStream = fs.createReadStream('./data/goals');
    let goalsJSON = '';
    let reqData = '';
    req.on('data', (chunk)=>{reqData = reqData + chunk});
    req.on('end', ()=>{reqData = JSON.parse(reqData)})
    readableStream.on('data',(chunk)=>{goalsJSON = goalsJSON + chunk});
    readableStream.on('end',()=>{
        let goals = JSON.parse(goalsJSON);
        if(!goals[req.params.userId][req.params.year]){
            res.statusCode = 404;
            res.end('Not found');
        }
        if(goals[req.params.userId][req.params.year]){
            goals[req.params.userId][req.params.year].push({id:Math.round(Date.now()+(Math.random()*1000)).toString(), name:reqData.goal, year:req.params.year, steps:reqData.steps});
        } else goals[req.params.userId][req.params.year] = [{id:Math.round(Date.now()+(Math.random()*1000)).toString(), name:reqData.goal, year:req.params.year, steps:reqData.steps}];
        readableStream.close();
        const writableStream = fs.createWriteStream('./data/goals');
        writableStream.write(JSON.stringify(goals));
        writableStream.on('finish', ()=>{
            res.statusCode = 200;
            res.end();
        });
    });
})

app.post('/api/yearly_goal_tracker/main/edit_goal/:userId/:year/goalId', function (req, res) {
    const readableStream = fs.createReadStream('./data/goals');
    let goalsJSON = '';
    let reqData = '';
    req.on('data', (chunk)=>{reqData = reqData + chunk});
    req.on('end', ()=>{reqData = JSON.parse(reqData)})
    readableStream.on('data',(chunk)=>{goalsJSON = goalsJSON + chunk});
    readableStream.on('end',()=>{
        let goals = JSON.parse(goalsJSON);
        if(!goals[req.params.userId][req.params.year]){
            res.statusCode = 404;
            res.end('Not found');
        }
        goals[req.params.userId][req.params.year].forEach((v, i, arr)=>{
            if(v.id === req.params.goalId){
                arr[i].steps = reqData.steps;
            }
        })
        readableStream.close();
        const writableStream = fs.createWriteStream('./data/goals');
        writableStream.write(JSON.stringify(goals));
        writableStream.on('finish', ()=>{
            res.statusCode = 200;
            res.end();
        });
    });
})

app.get('/api/yearly_goal_tracker/auth/sign_in/:login/:password', function (req, res) {
    const stream = fs.createReadStream('./data/users.json');
    let users = '';
    stream.on('data',(chunk)=>{users = users + chunk});
    stream.on('end',()=>{
        users = JSON.parse(users);
        const login = atob(req.params.login).slice(3);
        const password = atob(req.params.password).slice(3);
        if (users[login]) {
            if (users[login].password === password) {
                res.status(200).send({id: users[login].id});
            } else {
                res.status(401).send({message: 'Incorrect password'});
            }
        } else {
            res.status(404).send({message: 'User is not found'});
        }
        stream.close();
    });

})

app.put('/api/yearly_goal_tracker/auth/sign_up/:login/:password', function (req, res) {
    const streamUsersR = fs.createReadStream('./data/users.json');
    const streamGoalsR = fs.createReadStream('./data/goals.json');
    let users = '';
    let goals = '';
    streamUsersR.on('data',(chunk)=>{users = users + chunk});
    streamGoalsR.on('data',(chunk)=>{goals = goals + chunk});
    streamUsersR.on('end',()=>{
        users = JSON.parse(users);
        const login = atob(req.params.login).slice(3);
        const password = atob(req.params.password).slice(3);
        if(users[login]){
            res.status(409).send({message: 'User already exists'});
        } else {
            streamGoalsR.on('end', ()=>{
                goals = JSON.parse(goals);
                const id = Math.round(Date.now()+(Math.random()*1000)).toString()+login;
                users[login] = {id:id, password:password};
                goals[id] = {};

                streamGoalsR.close();
                streamUsersR.close();
                const streamUsersW = fs.createWriteStream('./data/users');
                const streamGoalsW = fs.createWriteStream('./data/goals');
                streamGoalsW.write(JSON.stringify(goals));
                streamUsersW.write(JSON.stringify(users));
                streamGoalsW.on('finish', ()=>{
                    streamUsersW.on('finish', ()=>{
                        res.statusCode = 200;
                        res.end();
                    });
                });
            })
        }
    });
});


app.listen(3000, (e) => {
    console.log(e);
});