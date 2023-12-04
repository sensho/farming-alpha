import { Config } from '../types';

const INFURA_APP_ID = process.env['INFURA_APP_ID'];

export const CONFIG: Config = {
	ethereum: {
		rpc: `https://mainnet.infura.io/v3/${INFURA_APP_ID}`,
		chainId: 1,
		stargateConfig: {
			stargateChainId: 101,
			routerAddress: '',
			ethRouterAddress: '0x150f94B44927F078737562f0fcF3C95c01Cc2376',
		},
		uniswapConfig: {
			poolFactoryContractAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
			quoterContractAddress: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
			routerContractAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
		},
		nativeAsset: 'eth',
		wrappedNativeAsset: 'weth',
		supportedAssets: {
			usdc: {
				assetAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			usdt: {
				assetAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			weth: {
				assetAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			wmatic: {
				assetAddress: '',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			wavax: {
				assetAddress: '',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
		},
		minNativeBalance: '0.02',
	},
	polygon: {
		rpc: `https://polygon-mainnet.infura.io/v3/${INFURA_APP_ID}`,
		chainId: 137,
		stargateConfig: {
			stargateChainId: 109,
			routerAddress: '',
		},
		uniswapConfig: {
			poolFactoryContractAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
			quoterContractAddress: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
			routerContractAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
		},
		nativeAsset: 'matic',
		wrappedNativeAsset: 'wmatic',
		supportedAssets: {
			usdc: {
				assetAddress: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			usdt: {
				assetAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			weth: {
				assetAddress: '',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			wmatic: {
				assetAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			wavax: {
				assetAddress: '',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
		},
		minNativeBalance: '',
	},
	optimism: {
		rpc: `https://optimism-mainnet.infura.io/v3/${INFURA_APP_ID}`,
		chainId: 10,
		stargateConfig: {
			stargateChainId: 111,
			routerAddress: '',
		},
		uniswapConfig: {
			poolFactoryContractAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
			quoterContractAddress: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
			routerContractAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
		},
		nativeAsset: 'eth',
		wrappedNativeAsset: 'weth',
		supportedAssets: {
			usdc: {
				assetAddress: '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			usdt: {
				assetAddress: '',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			weth: {
				assetAddress: '0x4200000000000000000000000000000000000006',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			wmatic: {
				assetAddress: '',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			wavax: {
				assetAddress: '',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
		},
		minNativeBalance: '',
	},
	arbitrum: {
		rpc: `https://arbitrum-mainnet.infura.io/v3/${INFURA_APP_ID}`,
		chainId: 42161,
		stargateConfig: {
			stargateChainId: 110,
			routerAddress: '',
		},
		uniswapConfig: {
			poolFactoryContractAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
			quoterContractAddress: '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6',
			routerContractAddress: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
		},
		nativeAsset: 'eth',
		wrappedNativeAsset: 'weth',
		supportedAssets: {
			usdc: {
				assetAddress: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			usdt: {
				assetAddress: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			weth: {
				assetAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			wmatic: {
				assetAddress: '',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			wavax: {
				assetAddress: '',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
		},
		minNativeBalance: '',
	},
	avalanche: {
		rpc: `https://avalanche-mainnet.infura.io/v3/${INFURA_APP_ID}`,
		chainId: 43114,
		stargateConfig: {
			stargateChainId: 106,
			routerAddress: '',
		},
		uniswapConfig: {
			poolFactoryContractAddress: '',
			quoterContractAddress: '',
			routerContractAddress: '',
		},
		nativeAsset: 'avax',
		wrappedNativeAsset: 'wavax',
		supportedAssets: {
			usdc: {
				assetAddress: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			usdt: {
				assetAddress: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			weth: {
				assetAddress: '',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			wmatic: {
				assetAddress: '',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
			wavax: {
				assetAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
				stargateConfig: {
					stargateAssetId: 0,
					supportedSwaps: [
						{
							chain: 'ethereum',
							asset: 'weth',
						},
					],
				},
			},
		},
		minNativeBalance: '',
	},
};
