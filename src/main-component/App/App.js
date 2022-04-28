import React from 'react';
import AllRoute from '../router'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../sass/style.scss';


const App = () => { 

  return (
    <div className="App" id='scrool'>
          <AllRoute/>
          <ToastContainer/>
    </div>
  );
}

export default App;
