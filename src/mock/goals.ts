import {Goals} from "../types";

const goals:Goals = {
    '2023': [
        {
            id: Math.round(Date.now()+(Math.random()*1000)).toString(),
            year:'2023',
            name:'Become a programmer',
            steps:[
                { name:'Learn java script',
                  state: true
                },
                { name:'Learn sass',
                    state: false
                },
                { name:'Learn algorithms',
                  state: true
                },
                { name:'Learn react',
                  state: true
                },
                { name:'Learn css',
                  state: true
                },
            ]
        },
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
    ],
    '2022': [
        {
            id: Math.round(Date.now()+(Math.random()*1000)).toString(),
            year:'2022',
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
            year:'2022',
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
                    state: false
                },
                { name:'Jog in the mornings',
                    state: false
                },
            ]
        },
    ],
};

export default goals;