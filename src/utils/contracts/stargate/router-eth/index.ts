import { getEthRouterAddress } from '../../../../config/environment';
import { BaseContract } from '../../BaseContract';

import defaultAbi from './abi.json';
import { StargateRouter } from '../router';
import { ethers } from 'ethers';
import { percentOf } from '../../../math.utils';
import { TransactionService } from '../../../../services/transaction';

export class StargateRouterEth extends BaseContract {
	private pk: string;

	constructor(pk: string) {
		super('ethereum', getEthRouterAddress(), pk, defaultAbi);
		this.pk = pk;
	}

	quoteLayerZeroFee = async (
		destChain: 'optimism' | 'arbitrum',
		functionType: number = 1,
		payload: string = '0x'
	): Promise<ethers.BigNumber> => {
		return await new StargateRouter('ethereum', this.pk).quoteLayerZeroFee(
			destChain,
			await this.wallet.getAddress(),
			await this.wallet.getAddress(),
			0,
			functionType,
			payload
		);
	};

	swapEth = async (
		destChain: 'optimism' | 'arbitrum',
		amountIn: ethers.BigNumber,
		lzFee: ethers.BigNumber
	) => {
		const method = 'swapETH';

		const nativeBalance = await this.wallet.getBalance();

		if (nativeBalance.lte(amountIn.add(lzFee))) {
			throw new Error('StargateRouterEth.swapEth: Insufficient Funds');
		}

		if (!this.contract.functions[method]) {
			throw new Error('StargateRouterEth.swapEth: Method not found');
		}

		const tx = await this.contract.functions[method](
			destChain,
			await this.wallet.getAddress(),
			await this.wallet.getAddress(),
			amountIn,
			percentOf(amountIn, 99, 100),
			{
				value: lzFee,
			}
		);

		await tx.wait();

		await TransactionService.createLzSwapTransaction(
			tx.hash,
			'ethereum',
			destChain,
			'eth',
			'eth',
			ethers.utils.formatEther(lzFee),
			await this.wallet.getAddress(),
			ethers.utils.formatEther(amountIn)
		);
	};
}
