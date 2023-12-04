import {
	getStargateIdForAsset,
	getStargateIdForChain,
	getStargateRouterAddress,
} from '../../../../config/environment';
import { ChainId } from '../../../../types';
import { BaseContract } from '../../BaseContract';

import defaultAbi from './abi.json';
import { Erc20TokenContract } from '../../erc20/Erc20Contract';
import { ethers } from 'ethers';
import { percentOf } from '../../../math.utils';
import { TransactionService } from '../../../../services/transaction';

export class StargateRouter extends BaseContract {
	constructor(chain: ChainId, pk: string, abi = defaultAbi) {
		super(chain, getStargateRouterAddress(chain), pk, abi);
	}

	quoteLayerZeroFee = async (
		destChain: ChainId,
		destRecepientAddress: string,
		dstNativeAddr: string,
		dstNativeAmount: number | ethers.BigNumber,
		functionType: number = 1,
		payload: string = '0x',
		dstGasForCall: number | ethers.BigNumber = 0
	): Promise<ethers.BigNumber> => {
		const method = 'quoteLayerZeroFee';

		const destChainStargateId = getStargateIdForChain(destChain);

		const data = await this.contract[method](
			destChainStargateId,
			functionType,
			destRecepientAddress,
			payload,
			{
				dstGasForCall,
				dstNativeAddr,
				dstNativeAmount,
			}
		);

		return data[0];
	};

	swap = async (
		srcAsset: Erc20TokenContract,
		destChain: ChainId,
		destAsset: Erc20TokenContract,
		amountIn: ethers.BigNumber,
		dustAmount: ethers.BigNumber,
		lzFee: ethers.BigNumber,
		payload: string = '0x'
	): Promise<void> => {
		const method = 'swap';

		const srcAssetBalance = await srcAsset.balance();

		if (srcAssetBalance.lt(amountIn)) {
			throw new Error('Insufficient Token Funds');
		}

		const nativeBalance = await this.wallet.getBalance();

		if (nativeBalance.lte(lzFee)) {
			throw new Error('Insufficient Native Funds');
		}

		if (!this.contract.functions[method]) {
			throw new Error('Method not found');
		}

		const tx = await this.contract.functions[method](
			getStargateIdForChain(destChain),
			getStargateIdForAsset(this.chain, srcAsset.assetId),
			getStargateIdForAsset(destChain, destAsset.assetId),
			await this.wallet.getAddress(),
			amountIn,
			percentOf(amountIn, 99, 100),
			{
				dstGasForCall: 0,
				dstNativeAmount: dustAmount,
				dstNativeAddr: await this.wallet.getAddress(),
			},
			await this.wallet.getAddress(),
			payload,
			{ value: lzFee }
		);

		await tx.wait();

		await TransactionService.createLzSwapTransaction(
			tx.hash,
			this.chain,
			destChain,
			srcAsset.assetId,
			destAsset.assetId,
			ethers.utils.formatEther(lzFee),
			await this.wallet.getAddress(),
			await srcAsset.formatValue(amountIn)
		);
	};
}
