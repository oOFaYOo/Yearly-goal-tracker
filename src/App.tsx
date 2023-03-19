import React, {createContext, useState} from 'react';
import Main from "./pages/Main";
import FakeApiClient from './api/FakeApiClient';
import AuthPage from "./pages/AuthPage";
import {Navigate, Route, Routes} from "react-router-dom";
import {IApiClient} from "./types";
import ApiClient from "./api/ApiClient";
import {Provider} from "react-redux";
import {store} from './store'

const api = new FakeApiClient();
// const api = new ApiClient();
export const Api = createContext<IApiClient>(api);

function App() {

const [isLoggedIn, setIsLoggedIn] = useState(false);

return (
      <Provider store={store}>
      <Api.Provider value={api}>
          <Routes>
              <Route path="/" element={<Navigate to={isLoggedIn ? "/yearly_goal_tracker/main" : "/yearly_goal_tracker/auth"}/>}/>
              <Route path="/yearly_goal_tracker/auth" element={isLoggedIn ? <Navigate to={"/yearly_goal_tracker/main"}/>: <AuthPage setAuthState={setIsLoggedIn} />} />
              <Route path="/yearly_goal_tracker/main" element={<Main setIsLoggedIn={setIsLoggedIn} />}/>
              <Route path="/yearly_goal_tracker/auth" element={<AuthPage setAuthState={setIsLoggedIn} />}/>
          </Routes>
      </Api.Provider>
      </Provider>
  );
}

export default App;
