module.exports = {
  DEPLOYEMNT_NETWORK: 'testnet',
  FORTMATIC_KEY: process.env.REACT_APP_FORTMATIC_API_KEY,
  CONTRACT_ADDRESS: {
    erc721: '0x0E556a4094403a9A0dEBD23687d232392EB1Ccc6',
    marketplace: '0x6eD1b11740F3eBFa28969b7D5c15a19F0D1C2a6e'
  },
  BLOCKCHAIN_NETWORK: {
    // ETHEREUM_RINKEBY: 'ethereum_rinkeby',
    // POLYGON_MUMBAI: 'polygon_mumbai',
    // ETHEREUM_MAINNET: 'ethereum_mainnet',
    // POLYGON_MAINNET: 'polygon_mainnet',
    BINANCE_TESTNET: 'binance_testnet'
    //BINANCE_MAINNET: 'binance_mainnet',
  },
  CHAIN_ID: {
    MAINNET: {
      ETHEREUM: 1,
      POLYGON: 137,
      BINANCE: 56
    },
    TESTNET: {
      ETHEREUM: 4,
      POLYGON: 80001,
      BINANCE: 97
    }
  },
  EXPLORERS: {
    1: 'https://etherscan.io',
    137: 'https://polygonscan.com',
    56: 'https://bscscan.com',
    4: 'https://rinkeby.etherscan.io',
    80001: 'https://mumbai.polygonscan.com',
    97: 'https://testnet.bscscan.com'
  },

  NETWORK_PARAMS: {
    97: [
      {
        chainId: '0x61',
        chainName: 'Binance Smart Chain Testnet',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'bnb',
          decimals: 18
        },
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
        blockExplorerUrls: ['https://testnet.bscscan.com']
      }
    ],

    80001: [
      {
        chainId: '0x13881',
        chainName: 'Polygon Testnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/']
      }
    ],
    137: [
      {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/']
      }
    ],
    56: [
      {
        chainId: '0x38',
        chainName: 'Binance SmartChain Mainnet',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'bnb',
          decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org'],
        blockExplorerUrls: ['https://bscscan.com']
      }
    ]
  }
};