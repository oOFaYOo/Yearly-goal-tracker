import {IGoals} from "../types";

const goals:IGoals = {
    '2023': [
        {
            id: Math.round(Date.now()+(Math.random()*1000)).toString(),
            year:'2023',
            name:'Move to another country',
            steps:[
                { name:'Collect documents',
                  state: true
                },
                { name:'Prepare the cat',
                  state: true
                },
                { name:'Pack your bags',
                  state: true
                },
                { name:'Fly away',
                  state: true
                },
            ]
        },
        {
            id: Math.round(Date.now()+(Math.random()*1000)).toString(),
            year:'2023',
            name:'Athletic body',
            steps:[
                { name:'Sign up for a gym',
                    state: false
                },
                { name:'Healthy food',
                    state: false
                },
                { name:'Do the exercises',
                    state: false
                },
                { name:'Jog in the mornings',
                    state: false
                },
            ]
        },
        {
            id: Math.round(Date.now()+(Math.random()*1000)).toString(),
            year:'2023',
            name:'Find a job in an international company',
            steps:[
                { name:'Successfully pass an interview',
                    state: false
                },
                { name:'Get hired for a good job',
                    state: false
                },
                { name:'Prepare for an interview',
                    state: true
                },
                { name:'Write a couple of small projects in the portfolio',
                    state: true
                },
                { name:'Learn English up to B1',
                    state: true
                }
            ]
        },
    ],
    '2022': [
        {
            id: Math.round(Date.now()+(Math.random()*1000)).toString(),
            year:'2022',
            name:'Become a better specialist',
            steps:[
                { name:'Learn to write unit tests',
                    state: true
                },
                { name:'Learn redux',
                    state: false
                },
                { name:'Learn tailwind',
                    state: true
                },
                { name:'Get commercial experience',
                    state: true
                },
                { name:'Get review experience',
                    state: false
                },
            ]
        },
        {
            id: Math.round(Date.now()+(Math.random()*1000)).toString(),
            year:'2022',
            name:'Athletic body',
            steps:[
                { name:'Sign up for a gym',
                    state: false
                },
                { name:'Healthy food',
                    state: false
                },
                { name:'Do the exercises',
                    state: false
                },
                { name:'Jog in the mornings',
                    state: false
                },
            ]
        },
    ],
    '2021': [
        {
            id: Math.round(Date.now()+(Math.random()*1000)).toString(),
            year:'2021',
            name:'Become a programmer',
            steps:[
                { name:'Learn java script',
                    state: true
                },
                { name:'Learn algorithms',
                    state: false
                },
                { name:'Learn react',
                    state: true
                },
                { name:'Learn css',
                    state: true
                },
                { name:'Learn sass',
                    state: false
                },
            ]
        },
        {
            id: Math.round(Date.now()+(Math.random()*1000)).toString(),
            year:'2021',
            name:'Athletic body',
            steps:[
                { name:'Sign up for a gym',
                    state: false
                },
                { name:'Healthy food',
                    state: false
                },
                { name:'Do the exercises',
                    state: true
                },
                { name:'Jog in the mornings',
                    state: false
                },
            ]
        },
    ],
};

export default goals;