import React, {createContext, useState} from 'react';
import Main from "./pages/Main";
import ApiClient, {IApiClient} from './ApiClient';
import AuthPage from "./pages/AuthPage";
import {Navigate, Route, Routes} from "react-router-dom";

const api = new ApiClient();
export const Api = createContext<IApiClient>(api);

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState({state:false, id:''});
console.log('+', isLoggedIn)
  return (
      <Api.Provider value={api}>
          <Routes>
              <Route path="/" element={<Navigate to={isLoggedIn.state ? "/yearly_goal_tracker/main" : "/yearly_goal_tracker/auth"}/>}/>
              <Route path="/yearly_goal_tracker/auth" element={isLoggedIn.state ? <Navigate to={"/yearly_goal_tracker/main"}/>: <AuthPage setAuthState={setIsLoggedIn} />} />
              <Route path="/yearly_goal_tracker/main" element={<Main/>}/>
              <Route path="/yearly_goal_tracker/auth" element={<AuthPage setAuthState={setIsLoggedIn} />}/>
          </Routes>
      </Api.Provider>
  );
}

export default App;
