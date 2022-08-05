import { ChainId } from '@usedapp/core';
import {providers, getDefaultProvider} from 'ethers';

export const LOCAL_CHAIN_ID = 31337;
type SupportedChains = ChainId.Rinkeby | ChainId.Mainnet | typeof LOCAL_CHAIN_ID;

/** Select the Chain to Use */
export const CHAIN_NAME = process.env.REACT_APP_CHAIN_NAME!;
export const PROVIDER_NAME = process.env.REACT_APP_PROVIDER_NAME!;
export const FOMO_WEBSOCKET = process.env.REACT_APP_WEB_SOCKET!;
export const PROVIDER_KEY = process.env.REACT_APP_PROVIDER_KEY!;
export const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY!;
/*--------------------------*/

// TODO: Clean this up
export const CHAIN_ID: SupportedChains =
    CHAIN_NAME === 'rinkeby' ? ChainId.Rinkeby
  : CHAIN_NAME === 'mainnet' ? ChainId.Mainnet
  : CHAIN_NAME === 'local' ? LOCAL_CHAIN_ID : -1;

const createProviderURL = (chainName: string) => {
  if (PROVIDER_NAME === 'alchemy') return `eth-${chainName}.alchemyapi.io/v2/${PROVIDER_KEY}`;
  else return `${chainName}.infura.io/v3/${PROVIDER_KEY}`;
}


interface Config {
  chainName: string;
  chainId: number;
  jsonRpcUri: string;
  wsRpcUri: string;
  fomoSettlerAddress: string;
  auctionProxyAddress: string;
  nounsDescriptor: string;
  nounsSeeder: string;
  tokenAddress: string;
  nounsDaoProxyAddress: string;
  nounsDaoExecutorAddress: string;
  enableHistory: boolean;
  yoloTokenAddress: string;
  yoloNounsDescriptor: string;
  yoloAuctionProxyAddress: string;
  
  hardPause: boolean;
}

const config: Record<SupportedChains, Config> = {
  [ChainId.Rinkeby]: {
    chainName: 'rinkeby',
    chainId: ChainId.Rinkeby,    
    jsonRpcUri: `https://${createProviderURL('rinkeby')}`,
    wsRpcUri: `wss://${createProviderURL('rinkeby')}`,
    
    fomoSettlerAddress: '0x6567F8eE62cd129049EE924c7B88a23be7DDaE5c',

    auctionProxyAddress: '0xDAF873A2Ae77D570da094B52A8eC50Ef8885b2c4',
    nounsDescriptor: '0x8B7Ec9f2ad70C10F4Ba5D352D6691B9BFF2F628b',
    nounsSeeder : '0x62F257406e9C1752c65d60ADF5D283FEe55C6301',
    tokenAddress: '0x65dA5EbD09f0C6CA1DFc5EaA5639626ccd5DaD06',

    nounsDaoProxyAddress: '0xd1C753D9A23eb5c57e0d023e993B9bd4F5086b04',
    nounsDaoExecutorAddress: '0xd1C753D9A23eb5c57e0d023e993B9bd4F5086b04',

    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true' || false,
    
    yoloTokenAddress: '0x31f5f6400e753Cfc071B18BAFdBE3Cb9aE22878f',
    yoloNounsDescriptor: '0x86ACfD89cb0564B5597576b6B2b71554d1920E78',
    yoloAuctionProxyAddress: '0x27ff1c1f9768f6fd61931ad5C62D0f9B0f6DfaEa',

    hardPause: process.env.REACT_APP_HARD_PAUSE === 'true' || false,
  },
  [ChainId.Mainnet]: {
    chainName: 'mainnet',
    chainId: ChainId.Mainnet,
    jsonRpcUri: `https://${createProviderURL('mainnet')}`,
    wsRpcUri: `wss://${createProviderURL('mainnet')}`,
    fomoSettlerAddress: '0xb2341612271e122ff20905c9e389c3d7f0F222a1',
    auctionProxyAddress: '0x830BD73E4184ceF73443C15111a1DF14e495C706',
    nounsDescriptor: '0x0Cfdb3Ba1694c2bb2CFACB0339ad7b1Ae5932B63',
    nounsSeeder: '0xCC8a0FB5ab3C7132c1b2A0109142Fb112c4Ce515',
    tokenAddress: '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
    nounsDaoProxyAddress: '0x6f3E6272A167e8AcCb32072d08E0957F9c79223d',
    nounsDaoExecutorAddress: '0x0BC3807Ec262cB779b38D65b38158acC3bfedE10',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true' || false,
    
    yoloTokenAddress: '0xB9e9053aB6dDd4f3FF717c1a22192D3517963A80',
    yoloNounsDescriptor: '0x5C12625d870ac2A93F4e08318BA4bF0c5C0C4270',
    yoloAuctionProxyAddress: '0xac3D44155D74D2D66117039fF4bC166DE2151Ab6',

    hardPause: process.env.REACT_APP_HARD_PAUSE === 'true' || false,
  },
  [LOCAL_CHAIN_ID]: {
    chainName: 'local',
    chainId: LOCAL_CHAIN_ID,
    jsonRpcUri: 'http://localhost:8545',
    wsRpcUri: 'ws://localhost:8545',

    fomoSettlerAddress: '0xFa7C3ab143074BcbF09db8450810d78E4B9b19a3',

    auctionProxyAddress: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
    nounsDescriptor: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
    nounsSeeder: '0x0165878a594ca255338adfa4d48449f69242eb8f',

    tokenAddress: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
    nounsDaoProxyAddress: '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
    nounsDaoExecutorAddress: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',    
    enableHistory: false,
    
    yoloTokenAddress: '0x4ed7c70f96b99c776995fb64377f0d4ab3b0e1c1',
    yoloNounsDescriptor: '0x59b670e9fa9d0a427751af201d676719a970857b',
    yoloAuctionProxyAddress: '0x4a679253410272dd5232b3ff7cf5dbb88f295319',

	/*    
    fomoSettlerAddress: '0xFa7C3ab143074BcbF09db8450810d78E4B9b19a3',
    auctionProxyAddress: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
    nounsDescriptor: '0x53cB482c73655D2287AE3282AD1395F82e6a402F',
    nounsSeeder: '0xCC8a0FB5ab3C7132c1b2A0109142Fb112c4Ce515',
    tokenAddress: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    nounsDaoProxyAddress: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
    nounsDaoExecutorAddress: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',    
    */

    hardPause: process.env.REACT_APP_HARD_PAUSE === 'true' || false,
  },
};

export default config[CHAIN_ID];

export const provider: providers.BaseProvider = getDefaultProvider(config[CHAIN_ID].jsonRpcUri);