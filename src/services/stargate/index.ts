import {
	getMinBalanceForChain,
	getSupportedPairs,
} from '../../config/environment';
import _ from 'lodash';
import { LayerZeroPlanService } from '../layerzero';
import { UniswapService } from '../uniswap';
import { WalletService } from '../wallet';
import { AssetId, ChainId, Erc20AssetIds } from '../../types';
import { Erc20TokenContract } from '../../utils/contracts/erc20/Erc20Contract';
import { WrappedTokenContract } from '../../utils/contracts/erc20/wrapped/WrappedContract';
import { StargateRouter } from '../../utils/contracts/stargate/router';
import { StargateRouterEth } from '../../utils/contracts/stargate/router-eth';

export class StargateService {
	private _pk;

	constructor(pk: string) {
		this._pk = pk;
	}

	private _swapEthOnEthereum = async () => {
		const wallet = await WalletService.getWalletFromPk(this._pk);

		if (!wallet) throw new Error('ERR_CHCK_12');

		await LayerZeroPlanService.setBridgingTransactionStatus(wallet, true);

		const ethRouter = new StargateRouterEth(this._pk);

		const destChain = _.sample<'optimism' | 'arbitrum'>([
			'optimism',
			'arbitrum',
		]);

		if (!destChain) throw new Error('ERR_CHCK_10');

		const lzFee = await ethRouter.quoteLayerZeroFee(destChain);

		const nativeBalance = await ethRouter.wallet.getBalance();

		const amountIn = nativeBalance
			.sub(lzFee)
			.sub(getMinBalanceForChain('ethereum'));

		await ethRouter.swapEth(destChain, amountIn, lzFee);

		await LayerZeroPlanService.setBridgingTransactionStatus(wallet, false);
		await LayerZeroPlanService.updateCurrentBridgeState(
			wallet,
			destChain,
			'eth'
		);
	};

	private _wrapNativeAsset = async (chain: ChainId) => {
		const wallet = await WalletService.getWalletFromPk(this._pk);

		if (!wallet) throw new Error('ERR_CHCK_13');

		await LayerZeroPlanService.setBridgingTransactionStatus(wallet, true);

		const wrapToken = new WrappedTokenContract(chain, this._pk);

		const balance = await wrapToken.wallet.getBalance();

		const minBalance = getMinBalanceForChain(chain);

		const amount = balance.sub(minBalance.mul(2));

		await wrapToken.deposit(amount);

		await LayerZeroPlanService.updateCurrentBridgeState(
			wallet,
			chain,
			wrapToken.assetId
		);
	};

	private _swapWrapTokenWithUsdc = async (chain: ChainId) => {
		const wallet = await WalletService.getWalletFromPk(this._pk);

		if (!wallet) throw new Error('ERR_CHCK_14');

		const wrapToken = new WrappedTokenContract(chain, this._pk);

		const usdc = new Erc20TokenContract(chain, 'usdc', this._pk);

		const amount = await wrapToken.balance();

		await new UniswapService(chain, this._pk).swap(wrapToken, usdc, amount);

		await LayerZeroPlanService.setBridgingTransactionStatus(wallet, false);

		await LayerZeroPlanService.updateCurrentBridgeState(
			wallet,
			chain,
			usdc.assetId
		);
	};

	_swapErc20Token = async (srcChain: ChainId, srcAsset: Erc20AssetIds) => {
		const wallet = await WalletService.getWalletFromPk(this._pk);

		if (!wallet) throw new Error('ERR_CHCK_12');

		await LayerZeroPlanService.setBridgingTransactionStatus(wallet, true);

		const supportedPairs = getSupportedPairs(srcChain, srcAsset);

		const randPair = _.sample(supportedPairs);

		if (!randPair) throw new Error('ERR_CHCK_15');

		const { chain: destChain, asset: destAsset } = randPair;

		const srcAssetToken = new Erc20TokenContract(srcChain, srcAsset, this._pk);
		const destAssetToken = new Erc20TokenContract(
			destChain,
			destAsset,
			this._pk
		);

		const router = new StargateRouter(srcChain, this._pk);

		// TODO: Check dest chain for pre-available funds
		const dustAmount = getMinBalanceForChain(destChain);

		const lzFee = await router.quoteLayerZeroFee(
			destChain,
			wallet.address,
			wallet.address,
			dustAmount
		);

		await router.swap(
			srcAssetToken,
			destChain,
			destAssetToken,
			await srcAssetToken.balance(),
			dustAmount,
			lzFee
		);

		await LayerZeroPlanService.setBridgingTransactionStatus(wallet, false);

		await LayerZeroPlanService.updateCurrentBridgeState(
			wallet,
			destChain,
			destAsset
		);
	};

	swap = async (srcChain: ChainId, srcAsset: AssetId) => {
		if (srcAsset === 'eth') {
			if (srcChain === 'ethereum') {
				return await this._swapEthOnEthereum();
			}

			if (srcChain === 'optimism' || srcChain === 'arbitrum') {
				await this._wrapNativeAsset(srcChain);
				await this._swapWrapTokenWithUsdc(srcChain);
				return await this._swapErc20Token(srcChain, 'usdc');
			}

			throw new Error('ERR_CHCK_11');
		}

		return await this._swapErc20Token(srcChain, 'usdc');
	};
}
