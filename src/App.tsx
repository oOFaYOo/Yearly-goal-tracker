import React, {createContext} from 'react';
import Main from "./pages/Main";
import ApiClient from './ApiClient';

const api = new ApiClient();
export const Api = createContext<ApiClient>(api);

function App() {
  return (
      <Api.Provider value={api}>
          <Main />
      </Api.Provider>
  );
}

export default App;
