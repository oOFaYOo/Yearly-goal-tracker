import React, {useContext, useState} from "react";
import {Api} from "../../App";

const AuthPage = ({setAuthState}: { setAuthState: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [action, setAction] = useState<'auth' | 'reg'>('auth');
    const [message, setMessage] = useState<{ text: string, color?: 'red' | 'green' }>({text: '', color: 'red'});
    const api = useContext(Api);

    if (message.text !== '') {
        setTimeout(() => {
            setMessage({text: '', color: 'red'})
        }, 2000);
    }

    return (
        <div
            className='bg-neutral-100 styled_scrollbar flex justify-center flex-col items-center absolute overflow-y-auto h-[100vh] w-[100vw]'>
            <div
                className='h-[50vh] w-[30vw] bg-white/80 min-w-[300px] overflow-hidden min-h-[300px] max-w-[500px] max-h-[500px] shadow-md rounded-xl border-2 border-teal-500 flex flex-col items-center'>
                <div className='w-full h-[36px]'>
                    <button
                        className={`${action === 'auth' ? 'bg-teal-500 text-white' : 'text-black hover:bg-white'} border-b-2 border-teal-500 w-[50%] h-full`}
                        onClick={() => {
                            setAction('auth');
                            setMessage({...message, text: ''})
                        }}>Sign in
                    </button>
                    <button
                        className={`${action === 'reg' ? 'bg-teal-500 text-white' : 'text-black hover:bg-white'} border-b-2 border-teal-500 w-[50%] h-full`}
                        onClick={() => {
                            setAction('reg');
                            setMessage({...message, text: ''})
                        }}>Sign up
                    </button>
                </div>
                <form className='flex grow flex-col gap-6 justify-center items-center w-full'
                      onSubmit={(e) => {
                          (async () => {
                              const login = (e.currentTarget.elements.namedItem('login') as HTMLInputElement).value;
                              const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
                              if (action === 'auth') {
                                  const response = await api.signIn(login, password);
                                  if (response.isSuccessful && response.isAuthorized) {
                                      document.cookie = `session=${response.result}`;
                                      setAuthState(true);
                                  } else {
                                      setMessage({...message, text: response.result ?? ''});
                                      setAuthState(false)
                                  }
                              } else {
                                  const response = await api.signUp(login, password);
                                  if (response.isSuccessful) {
                                      setMessage({text: 'Successfully registered', color: 'green'})
                                  } else {
                                      setMessage({...message, text: response.result ?? ''});
                                      setAuthState(false)
                                  }
                              }
                          })()
                          e.preventDefault();
                      }}
                >
                    <div
                        className={message.text === '' ? 'h-6 mb-1 opacity-0 duration-200' : (message.color === 'red' ? 'duration-200 text-rose-700 h-6 mb-1 opacity-100' : 'duration-200 text-green-600 h-6 mb-1 opacity-100')}>{message.text}</div>
                    <div className='px-4 flex flex-row w-full justify-between'>
                        <label htmlFor={'login'}><p>Login</p></label>
                        <input id={'login'} name={'login'}
                               className='rounded-md outline-none w-[70%] px-2 border-2 border-teal-500' type='text'
                               required/>
                    </div>
                    <div className='px-4 flex flex-row w-full justify-between'>
                        <label htmlFor={'password'}><p>Password</p></label>
                        <input id={'password'} name={'password'}
                               className='rounded-md outline-none w-[70%] px-2 border-2 border-teal-500' type='password'
                               required/>
                    </div>
                    <button
                        className='shadow-md text-white hover:scale-105 active:scale-100 hover:brightness-110 rounded-lg bg-teal-500 w-[100px] h-[36px]'
                        type={"submit"}>{action === 'auth' ? 'Log in' : 'Register'}</button>
                </form>
                <button className='w-full h-[36px] hover:text-white border-t-2 border-teal-500 hover:bg-teal-500/60'
                        onClick={() => {
                            (
                                async () => {
                                    const response = await api.signIn('123', '123');
                                    if (response.isSuccessful && response.isAuthorized) {
                                        document.cookie = `session=${response.result}`;
                                        setAuthState(true);
                                    }
                                }
                            )()
                        }}
                >Demo user
                </button>
            </div>
        </div>
    )
}

export default AuthPage;