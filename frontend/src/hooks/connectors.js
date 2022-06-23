import { InjectedConnector } from '@web3-react/injected-connector';
import { CHAIN_ID } from '../constants/blockchainConstants';

// const POLLING_INTERVAL = 12000;
const { MAINNET, TESTNET } = CHAIN_ID;
const SUPPORTED_CHAIN_IDS = [
	MAINNET.BINANCE,
	MAINNET.ETHEREUM,
	MAINNET.POLYGON,
	TESTNET.BINANCE,
	TESTNET.ETHEREUM,
	TESTNET.POLYGON
];

// const RPC_URL_56 = 'https://bsc-dataseed1.binance.org';
// const BRIDGE_URL = 'https://bridge.walletconnect.org';

export const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAIN_IDS });




