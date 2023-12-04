import { Config, ChainId, Erc20AssetIds } from '../types';
import { CONFIG as PROD_CONFIG } from './environment.prod';
import { CONFIG as STG_CONFIG } from './environment.stg';
import { CONFIG as DEV_CONFIG } from './environment.local';
import { ethers } from 'ethers';

const ENV = process.env['NODE_ENV'];

console.log('ENV is', ENV);

let CONFIG: Config;

switch (ENV) {
	case 'PROD':
		CONFIG = PROD_CONFIG;
		break;
	case 'STG':
		CONFIG = STG_CONFIG;
		break;
	case 'DEV':
		CONFIG = DEV_CONFIG;
		break;
	default:
		CONFIG = DEV_CONFIG;
		break;
}

type UniswapPoolFee = Record<Erc20AssetIds, Record<Erc20AssetIds, number>>;

const UNISWAP_POOL_FEES: UniswapPoolFee = {
	wavax: {
		usdc: 100,
		weth: 0,
		wmatic: 0,
		usdt: 0,
		wavax: 0,
	},
	usdc: {
		usdc: 100,
		weth: 0,
		wmatic: 0,
		usdt: 100,
		wavax: 0,
	},
	weth: {
		weth: 0,
		wmatic: 0,
		usdc: 0,
		usdt: 0,
		wavax: 0,
	},
	wmatic: {
		weth: 0,
		wmatic: 0,
		usdc: 0,
		usdt: 0,
		wavax: 0,
	},
	usdt: {
		weth: 0,
		wmatic: 0,
		usdc: 0,
		usdt: 0,
		wavax: 0,
	},
};

export const getChainRpcFromChainId = (chain: ChainId): string => {
	return CONFIG[chain].rpc;
};

export const getAssetAddress = (chain: ChainId, asset: Erc20AssetIds) => {
	return CONFIG[chain].supportedAssets[asset].assetAddress;
};

export const getWrappedNativeAssetIdForChain = (
	chain: ChainId
): Erc20AssetIds => {
	return CONFIG[chain].wrappedNativeAsset;
};

export const getUniswapQuoterAddress = (chain: ChainId): string => {
	return CONFIG[chain].uniswapConfig.quoterContractAddress;
};

export const getUniswapPoolFee = (
	tokenIn: Erc20AssetIds,
	tokenOut: Erc20AssetIds
): number => {
	return UNISWAP_POOL_FEES[tokenIn][tokenOut];
};

export const getUniswapRouterAddress = (chain: ChainId): string => {
	return CONFIG[chain].uniswapConfig.routerContractAddress;
};

export const getUniswapSlippage = (
	chain: ChainId,
	tokenIn: Erc20AssetIds,
	tokenOut: Erc20AssetIds
): number => {
	console.log({ chain, tokenIn, tokenOut });
	return 1;
};

export const getStargateRouterAddress = (chain: ChainId): string => {
	return CONFIG[chain].stargateConfig.routerAddress;
};

export const getStargateIdForChain = (chain: ChainId): number => {
	return CONFIG[chain].stargateConfig.stargateChainId;
};

export const getStargateIdForAsset = (
	chain: ChainId,
	asset: Erc20AssetIds
): number => {
	return CONFIG[chain].supportedAssets[asset].stargateConfig.stargateAssetId;
};

export const getMinBalanceForChain = (chain: ChainId): ethers.BigNumber => {
	return ethers.utils.parseEther(CONFIG[chain].minNativeBalance);
};

export const getEthRouterAddress = (): string => {
	return CONFIG.ethereum.stargateConfig.ethRouterAddress as string;
};

export const getSupportedPairs = (
	srcChain: ChainId,
	srcAsset: Erc20AssetIds
) => {
	return CONFIG[srcChain].supportedAssets[srcAsset].stargateConfig
		.supportedSwaps;
};
