import React from 'react';
import AllRoute from '../router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../sass/style.scss';
import { AppContextProvider } from '../../modules/contexts';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from '../../context/user-context-provider';

const App = () => {
  return (
    <div className="App" id="scrool">
      <UserContextProvider>
        <AppContextProvider>
          <AllRoute />
        </AppContextProvider>
      </UserContextProvider>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default App;
