import { ChainId } from '../../../../types';
import { ethers } from 'ethers';

import {
	getUniswapPoolFee,
	getUniswapQuoterAddress,
} from '../../../../config/environment';

import { Erc20TokenContract } from '../../erc20/Erc20Contract';
import { BaseContract } from '../../BaseContract';

import defaultAbi from './abi.json';

export class UniswapQuoterContract extends BaseContract {
	constructor(
		chain: ChainId,
		pk: string,
		abi: ethers.ContractInterface = defaultAbi
	) {
		super(chain, getUniswapQuoterAddress(chain), pk, abi);
	}

	quote = async (
		tokenIn: Erc20TokenContract,
		tokenOut: Erc20TokenContract,
		amountIn: ethers.BigNumber,
		sqrtPriceLimitX96: number = 0
	): Promise<ethers.BigNumber> => {
		const method = 'quoteExactInputSingle';
		const fee = getUniswapPoolFee(tokenIn.assetId, tokenOut.assetId);

		if (!this.contract.callStatic[method]) throw new Error('ERR_CHCK_6');

		const quote: ethers.BigNumber = await this.contract.callStatic[method](
			tokenIn.contract.address,
			tokenOut.contract.address,
			fee,
			amountIn,
			sqrtPriceLimitX96
		);

		return quote;
	};
}
