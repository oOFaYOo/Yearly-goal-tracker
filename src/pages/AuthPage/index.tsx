import React, {useContext, useState} from "react";
import {Api} from "../../App";

const AuthPage = ({setAuthState}:{setAuthState:React.Dispatch<React.SetStateAction<{state:boolean, id:string}>>}) => {

const [action, setAction] = useState<'auth'|'reg'>('auth');
const [errMessage, setErrMessage] = useState('');
const api = useContext(Api);

    return (
        <div className='bg-gray-50 styled_scrollbar flex justify-center items-center absolute overflow-y-auto h-[100vh] w-[100vw]'>
            {errMessage === '' ? null : <div>{errMessage}</div>}
            <div className='h-[50vh] w-[30vw] min-w-[300px] overflow-hidden min-h-[300px] max-w-[500px] max-h-[500px] shadow-md rounded-lg border-2 border-teal-500 flex flex-col items-center'>
                <div className='w-full h-[36px]'>
                    <button className={action === 'auth' ? 'border-b-2 border-teal-500 w-[50%] h-full bg-teal-500' : 'border-b-2 hover:bg-white border-teal-500 w-[50%] h-full'}
                            onClick={()=>{setAction('auth')}}>Sign in</button>
                    <button className={action === 'reg' ? 'border-b-2 border-teal-500 w-[50%] h-full bg-teal-500' : 'border-b-2 hover:bg-white border-teal-500 w-[50%] h-full'}
                            onClick={()=>{setAction('reg')}}>Sign up</button>
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
                                setErrMessage(err.errorMessage);
                                setAuthState({state:err.status, id:''})
                            });
                        }
                    })()
                    e.preventDefault();
                }}
                >
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
                >Demo user</button>
            </div>
        </div>
    )
}

export default AuthPage;