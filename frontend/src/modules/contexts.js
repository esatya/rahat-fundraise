import React, { createContext, useReducer, useCallback } from 'react';
import appReduce from './reducers';
import APP_ACTIONS from './actions';
import { useAuth } from '../hooks/useWalletAuth';

const initialState = {
  is_app_ready: false
};


export const AppContext = createContext(initialState);
export const AppContextProvider = ({ children }) => {
  const { connectMetaMask, disconnect } = useAuth();
  const [state, dispatch] = useReducer(appReduce, initialState);

  const initApp = useCallback(async () => {
    dispatch({ type: APP_ACTIONS.INIT_APP, data: { app_ready: true } });
  }, [dispatch]);


  return (
    <AppContext.Provider
      value={{
        is_app_ready: state.is_app_ready,
        initApp,
        dispatch,
        connectMetaMask,
        disconnect
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
