import {
	getAssetAddress,
	getUniswapPoolFee,
	getUniswapRouterAddress,
	getUniswapSlippage,
} from '../../../../config/environment';
import { ChainId } from '../../../../types';
import { BaseContract } from '../../BaseContract';

import defaultAbi from './abi.json';
import { Erc20TokenContract } from '../../erc20/Erc20Contract';
import { percentOf } from '../../../math.utils';
import { ethers } from 'ethers';

export class UniswapRouterContract extends BaseContract {
	constructor(chain: ChainId, pk: string) {
		super(chain, getUniswapRouterAddress(chain), pk, defaultAbi);
	}

	exactInputSingle = async (
		tokenIn: Erc20TokenContract,
		tokenOut: Erc20TokenContract,
		amountIn: ethers.BigNumber,
		amountOut: ethers.BigNumber
	): Promise<void> => {
		const method = 'exactInputSingle';

		if (this.chain !== tokenIn.chain || this.chain !== tokenOut.chain) {
			throw new Error('ERR_CHCK_7: Chain Mismatch');
		}

		const userBalance = await tokenIn.balance();

		if (userBalance.lt(amountIn)) {
			throw new Error('Insufficient Funds');
		}

		const tokenInAddress = getAssetAddress(this.chain, tokenIn.assetId);
		const tokenOutAddress = getAssetAddress(this.chain, tokenOut.assetId);

		const slippagePercent = getUniswapSlippage(
			this.chain,
			tokenIn.assetId,
			tokenOut.assetId
		);

		const slippageValue = percentOf(amountOut, slippagePercent, 100);

		const amountOutMin = amountOut.sub(slippageValue);

		const gasPrice = (await this.wallet.getFeeData()).maxFeePerGas;

		if (!gasPrice) {
			throw new Error('No gas price');
		}

		const args = [
			{
				tokenIn: tokenInAddress,
				tokenOut: tokenOutAddress,
				fee: getUniswapPoolFee(tokenIn.assetId, tokenOut.assetId),
				recipient: await this.wallet.getAddress(),
				deadline: Date.now() + 10000,
				amountIn: amountIn,
				amountOutMinimum: amountOutMin,
				sqrtPriceLimitX96: 0,
			},
			{
				gasPrice,
			},
		];

		if (
			!this.contract.estimateGas[method] ||
			!this.contract.functions[method]
		) {
			throw new Error('ERR_CHCK_8');
		}

		await this.contract.estimateGas[method](...args);

		const tx = await this.contract.functions[method](...args);

		await tx.wait();
	};
}
