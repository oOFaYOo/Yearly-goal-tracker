import React, {useContext, useState} from "react";
import {Api} from "../../App";

const AuthPage = ({setAuthState}:{setAuthState:React.Dispatch<React.SetStateAction<{state:boolean, id:string}>>}) => {

const [action, setAction] = useState<'auth'|'reg'>('auth');
const [message, setMessage] = useState('');
const api = useContext(Api);

if(message !== ''){
    setTimeout(() => {setMessage('')}, 2000);
}

    return (
        <div className='bg-gray-50 styled_scrollbar flex justify-center flex-col items-center absolute overflow-y-auto h-[100vh] w-[100vw]'>
             <div className='h-[50vh] w-[30vw] min-w-[300px] overflow-hidden min-h-[300px] max-w-[500px] max-h-[500px] shadow-md rounded-lg border-2 border-teal-500 flex flex-col items-center'>
                <div className='w-full h-[36px]'>
                    <button className={action === 'auth' ? 'border-b-2 border-teal-500 w-[50%] h-full bg-teal-500' : 'border-b-2 hover:bg-white border-teal-500 w-[50%] h-full'}
                            onClick={()=>{setAction('auth'); setMessage('')}}>Sign in</button>
                    <button className={action === 'reg' ? 'border-b-2 border-teal-500 w-[50%] h-full bg-teal-500' : 'border-b-2 hover:bg-white border-teal-500 w-[50%] h-full'}
                            onClick={()=>{setAction('reg'); setMessage('')}}>Sign up</button>
                </div>
                <form className='flex grow flex-col gap-6 justify-center items-center w-full'
                onSubmit={(e)=>{
                    (()=>{
                        const login = (e.currentTarget.elements.namedItem('login') as HTMLInputElement).value;
                        const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
                        if(action === 'auth'){
                            api.signIn(login, password).then((result)=>{
                                setAuthState({state:result.status, id:result.id!});
                            }, (err)=>{
                                setMessage(err.message);
                                setAuthState({state:err.status, id:''})
                            });
                        } else {
                            api.signUp(login, password).then((result)=>{
                                setAuthState({state:result.status, id:''});
                                setMessage(result.message)
                            }, (err)=>{
                                setMessage(err.message);
                                setAuthState({state:err.status, id:''})
                            });
                        }
                    })()
                    e.preventDefault();
                }}
                >
                    <div className={message === '' ? 'h-6 mb-1 opacity-0 duration-200' : (action === 'auth' ? 'duration-200 text-rose-700 h-6 mb-1 opacity-100' : 'duration-200 text-green-600 h-6 mb-1 opacity-100')}>{message}</div>
                    <div className='px-4 flex flex-row w-full justify-between'>
                        <label htmlFor={'login'}><p>Login</p></label>
                        <input id={'login'} name={'login'} className='rounded outline-none w-[70%] px-2 border-2 border-teal-500' type='text' required/>
                    </div>
                    <div className='px-4 flex flex-row w-full justify-between'>
                        <label htmlFor={'password'}><p>Password</p></label>
                        <input id={'password'} name={'password'} className='rounded outline-none w-[70%] px-2 border-2 border-teal-500' type='password' required/>
                        </div>
                    <button className='shadow-md hover:scale-105 active:scale-100 hover:brightness-110 rounded bg-teal-500 w-[100px] h-[36px]' type={"submit"}>{action === 'auth' ? 'Log in' : 'Register'}</button>
                </form>
                <button className='w-full h-[36px] border-t-2 border-teal-500 hover:bg-teal-500/30'
                onClick={() => {
                        api.signIn('123', '123').then((result)=>{
                            setAuthState({state:result.status, id:result.id!});
                        })
                }}
                >Demo user</button>
            </div>
        </div>
    )
}

export default AuthPage;