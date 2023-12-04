import { ethers } from 'ethers';
import { ChainId } from '../../types';
import { Erc20TokenContract } from '../../utils/contracts/erc20/Erc20Contract';
import { UniswapQuoterContract } from '../../utils/contracts/uniswap/quoter/UniswapQuoterContract';
import { UniswapRouterContract } from '../../utils/contracts/uniswap/router/UniswapRouterContract';

export class UniswapService {
	chain: ChainId;
	private pk: string;

	constructor(chain: ChainId, pk: string) {
		this.chain = chain;
		this.pk = pk;
	}

	swap = async (
		tokenIn: Erc20TokenContract,
		tokenOut: Erc20TokenContract,
		amountIn: ethers.BigNumber
	): Promise<boolean> => {
		try {
			const preSwapTokenOutBalance = await tokenOut.balance();

			const quoter = new UniswapQuoterContract(this.chain, this.pk);

			const quotedAmountOut = await quoter.quote(tokenIn, tokenOut, amountIn);

			const swapRouter = new UniswapRouterContract(this.chain, this.pk);

			await tokenIn.approve(swapRouter.contract.address, amountIn);

			await swapRouter.exactInputSingle(
				tokenIn,
				tokenOut,
				amountIn,
				quotedAmountOut
			);

			const postSwapTokenOutBalance = await tokenOut.balance();

			if (preSwapTokenOutBalance.gte(postSwapTokenOutBalance)) return false;

			return true;
		} catch (err) {
			return false;
		}
	};
}
