type ChainId = 'ethereum' | 'polygon' | 'optimism' | 'arbitrum' | 'avalanche';

type NativeAssetIds = 'eth' | 'matic' | 'avax';

type Erc20AssetIds = 'weth' | 'wmatic' | 'usdc' | 'usdt' | 'wavax';

type AssetId = NativeAssetIds | Erc20AssetIds;

type ChainConfig = {
	rpc_url: string;
	stargate_id: number;
	chain_code: ChainId;
	router_address: string;
	eth_router_address?: string;
	gas_tracker: string;
};

type AssetOnChainConfig = {
	address: string;
	swappable_to: { asset: AssetId; chain: ChainId }[];
};

type AssetConfig = {
	asset_code: AssetId;
	stargate_id: number;
	asset_on_chain: Record<ChainId, AssetOnChainConfig>;
};

export type Config = Record<
	ChainId,
	{
		minNativeBalance: string;
		rpc: string;
		chainId: number;
		nativeAsset: NativeAssetIds;
		wrappedNativeAsset: Erc20AssetIds;
		stargateConfig: {
			stargateChainId: number;
			routerAddress: string;
			ethRouterAddress?: string;
		};
		uniswapConfig: {
			routerContractAddress: string;
			poolFactoryContractAddress: string;
			quoterContractAddress: string;
		};
		supportedAssets: Record<
			Erc20AssetIds,
			{
				assetAddress: string;
				stargateConfig: {
					stargateAssetId: number;
					supportedSwaps: {
						chain: ChainId;
						asset: Erc20AssetIds;
					}[];
				};
			}
		>;
	}
>;
