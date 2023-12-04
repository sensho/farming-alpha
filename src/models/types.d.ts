import { AssetId, ChainId, Erc20AssetIds } from '../types';

export type IUser = {
	telegram_user_id: number;
	first_name?: string;
	last_name?: string;
	wallet: Schema.Types.ObjectId | IWallet;
	isBlacklisted: boolean;
};

export type IWallet = {
	private_key: string;
	address: string;
	layer_zero_plan: Schema.Types.ObjectId | ILayerZeroPlan;
};

type Erc20ApproveTransaction = {
	type: 'ERC20_APPROVE';
	spender: string;
	amount: string;
};

type Erc20TransferTransaction = {
	type: 'ERC20_TRANSFER';
	to: string;
	amount: string;
};

type Erc20TransferFromTransaction = {
	type: 'ERC20_TRANSFER_FROM';
	from: string;
	to: string;
	amount: string;
};

type WrappedDeposit = {
	type: 'WRAPPED_TOKEN_DEPOSIT';
	amount: string;
};

type WrappedWithdraw = {
	type: 'WRAPPED_TOKEN_WITHDRAW';
	amount: string;
};

type UniswapExactInputSingleSwap = {
	type: 'UNISWAP_EXACT_INPUT_SINGLE_SWAP';
	token_in: Erc20AssetIds;
	token_out: Erc20AssetIds;
	fee: number;
	slippage: number;
	amount: string;
};

type StargateSwapTransaction = {
	type: 'STARGATE_SWAP';
	token_in: Erc20AssetIds;
	token_out: Erc20AssetIds;
	dest_chain: ChainId;
	amount: string;
};

type BotFeeTransferTransaction = {
	type: 'BOT_FEE_TRANSFER';
	fee_account: string;
	amount: string;
};

export type ITransaction = {
	wallet: Schema.Types.ObjectId | IWallet;
	tx_hash: string;
	chain: ChainId;
} & (
	| Erc20ApproveTransaction
	| Erc20TransferTransaction
	| Erc20TransferFromTransaction
	| WrappedDeposit
	| WrappedWithdraw
	| UniswapExactInputSingleSwap
	| StargateSwapTransaction
	| BotFeeTransferTransaction
);

export type ILayerZeroPlan = {
	wallet: Schema.Types.ObjectId | IWallet;
	plan_name: string;
	min_deposit: number;
	min_volume: number;
	min_transactions: number;
	volume_till_date_in_eth: number;
	transactions: number;
	isActive: boolean;
	stargate: {
		stakes: {
			isActive: boolean;
			start_date?: Date;
			end_date?: Date;
		};
		bridging: {
			isTransactionActive: boolean;
			current_chain_code: ChainId;
			current_asset_code: AssetId;
		};
	};
};
