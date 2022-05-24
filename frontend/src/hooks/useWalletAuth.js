import { useCallback, createContext, useContext, useEffect, useRef } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useHistory } from 'react-router-dom';

import { injected } from './connectors';

export const AuthContext = createContext({});
export const useAuthMethod = () => useContext(AuthContext);

export const useAuth = () => {
	const { activate, deactivate, account, chainId, connector } = useWeb3React();
	const mounted = useRef(false);
	const history = useHistory();

	useEffect(() => {
		if (!mounted.current) mounted.current = true;
		if (!account) localStorage.removeItem('wallet-auth');

		if (
			connector &&
			Boolean(connector.supportedChainIds) &&
			!connector.supportedChainIds.includes(chainId)
		) {
			console.log('Selected blockchain not supported, Please select different network!');
		}
		// else if (!account) {
		//   localStorage.removeItem("auth");
		//   console.log("HISTORY==>", history);
		//   history.push(PATH_INDEX);
		// }
		// if (chainId && !CURRENT_CHAIN_ID.includes(chainId))
		//   history.push(PATH_INDEX);
	}, [account, history, chainId, connector]);

	const connectMetaMask = useCallback(async () => {
		try {
			await activate(injected);
			localStorage.setItem('wallet-auth', 'MetaMask');
		} catch (e) {
			console.log('ERR=>', e);
			localStorage.removeItem('wallet-auth');
		}
	}, [activate]);

	const disconnect = useCallback(() => {
		try {
			deactivate();
			localStorage.removeItem('wallet-auth');
			localStorage.removeItem('walletconnect');
		} catch (err) {
			console.log('ERR==>', err);
		}
	}, [deactivate]);

	// Set wallet context on page refresh
	useEffect(() => {
		(async () => {
			if (localStorage.getItem('wallet-auth') === 'MetaMask') {
				await connectMetaMask();
			}
		})();
	}, [connectMetaMask]);

	return { connectMetaMask,  disconnect };
};
