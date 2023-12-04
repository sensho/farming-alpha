import { TransactionModel } from '../../models/transaction.model';
import { WalletService } from '../wallet';
import { AssetId, ChainId } from '../../types';

export class TransactionService {
	static createErc20ApproveTransaction = async (
		tx_hash: string,
		spender: string,
		amount: string,
		chain: ChainId,
		owner: string
	): Promise<void> => {
		await TransactionModel.create({
			wallet: await WalletService.getWalletFromAddress(owner),
			type: 'ERC20_APPROVE',
			tx_hash,
			spender,
			amount,
			chain,
		});
	};

	static createErc20TransferTransaction = async (
		tx_hash: string,
		to: string,
		amount: string,
		chain: ChainId,
		owner: string
	): Promise<void> => {
		await TransactionModel.create({
			tx_hash,
			amount,
			chain,
			to,
			type: 'ERC20_TRANSFER',
			wallet: await WalletService.getWalletFromAddress(owner),
		});
	};

	static createErc20TransferFromTransaction = async (
		tx_hash: string,
		from: string,
		to: string,
		amount: string,
		chain: ChainId,
		owner: string
	): Promise<void> => {
		await TransactionModel.create({
			wallet: await WalletService.getWalletFromAddress(owner),
			type: 'ERC20_TRANSFER_FROM',
			tx_hash,
			amount,
			chain,
			from,
			to,
		});
	};

	static createWrappedDepositTransaction = async (
		tx_hash: string,
		chain: ChainId,
		owner: string,
		amount: string
	): Promise<void> => {
		await TransactionModel.create({
			wallet: await WalletService.getWalletFromAddress(owner),
			type: 'WRAPPED_TOKEN_DEPOSIT',
			tx_hash,
			amount,
			chain,
		});
	};

	static createWrappedWithdrawTransaction = async (
		tx_hash: string,
		chain: ChainId,
		owner: string,
		amount: string
	): Promise<void> => {
		await TransactionModel.create({
			wallet: await WalletService.getWalletFromAddress(owner),
			type: 'WRAPPED_TOKEN_WITHDRAW',
			tx_hash,
			amount,
			chain,
		});
	};

	static createLzSwapTransaction = async (
		tx_hash: string,
		chain: ChainId,
		dest_chain: ChainId,
		token_in: AssetId,
		token_out: AssetId,
		fee: string,
		owner: string,
		amount: string
	): Promise<void> => {
		await TransactionModel.create({
			wallet: await WalletService.getWalletFromAddress(owner),
			type: 'STARGATE_SWAP',
			tx_hash,
			amount,
			chain,
			token_in,
			token_out,
			dest_chain,
			fee: fee,
		});
	};

	static createBotFeeTransferTransaction = async (
		hash: string,
		owner: string,
		account: string,
		amount: string
	): Promise<void> => {
		await TransactionModel.create({
			wallet: await WalletService.getWalletFromAddress(owner),
			type: 'BOT_FEE_TRANSFER',
			chain: 'ethereum',
			tx_hash: hash,
			fee_account: account,
			amount,
		});
	};
}
