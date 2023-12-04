import mongoose from 'mongoose';
import { ITransaction } from './types';

const TRANSACTION_TYPES: ITransaction['type'][] = [
	'ERC20_APPROVE',
	'ERC20_TRANSFER',
	'ERC20_TRANSFER_FROM',
	'WRAPPED_TOKEN_DEPOSIT',
	'WRAPPED_TOKEN_WITHDRAW',
	'UNISWAP_EXACT_INPUT_SINGLE_SWAP',
	'STARGATE_SWAP',
	'BOT_FEE_TRANSFER',
];

const TransactionSchema = new mongoose.Schema({
	wallet: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Wallet',
		required: true,
	},
	tx_hash: {
		type: String,
		required: true,
	},
	chain: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: TRANSACTION_TYPES,
		required: true,
	},
	// APPROVE METADATA
	spender: {
		type: String,
	},
	amount: {
		type: String,
	},
	// TRANSFER METADATA
	to: {
		type: String,
	},
	// TRANSFER METADATA
	from: {
		type: String,
	},
	// UNISWAP SWAP METADATA
	token_in: {
		type: String,
	},
	token_out: {
		type: String,
	},
	fee: {
		type: Number,
	},
	slippage: {
		type: Number,
	},
	// Layer Zero Swap
	dest_chain: {
		type: String,
	},
	// Bot Fee Transfer
	fee_account: {
		type: String,
	},
});

export const TransactionModel = mongoose.model<ITransaction>(
	'Transaction',
	TransactionSchema
);
