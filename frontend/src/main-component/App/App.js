import React from 'react';
import AllRoute from '../router'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../sass/style.scss';
import {AppContextProvider} from '../../modules/contexts'


const App = () => { 

  return (
    <div className="App" id='scrool'>
      <AppContextProvider>
          <AllRoute/>
          <ToastContainer/>
      </AppContextProvider>
    </div>
  );
}

export default App;
