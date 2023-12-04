import { ethers } from 'ethers';
import { getChainRpcFromChainId } from '../config/environment';
import { ChainId } from '../types';
import _ from 'lodash';
import { TransactionService } from '../services/transaction';

const addresses: string[] = process.env['SENSHO_WALLETS']?.split(',') || [];

export const getNativeBalance = (chain: ChainId, address: string) => {
	const provider = new ethers.providers.JsonRpcProvider(
		getChainRpcFromChainId(chain)
	);

	return provider.getBalance(address);
};

export const transferEthForBotFee = async (
	amount: ethers.BigNumber,
	pk: string,
	chain: ChainId
) => {
	const walletAddress = _.sample(addresses);

	if (!walletAddress) throw new Error('ERR_CHCK_15');

	const provider = new ethers.providers.JsonRpcBatchProvider(
		getChainRpcFromChainId(chain)
	);
	const wallet = new ethers.Wallet(pk, provider);

	const tx = await wallet.sendTransaction({
		to: walletAddress,
		value: amount,
	});

	await tx.wait();

	await TransactionService.createBotFeeTransferTransaction(
		tx.hash,
		await wallet.getAddress(),
		walletAddress,
		ethers.utils.formatEther(amount)
	);
};
