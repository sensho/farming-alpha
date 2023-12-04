import mongoose from 'mongoose';
import { IWallet } from './types';

const WalletSchema = new mongoose.Schema<IWallet>({
	private_key: {
		type: String,
		required: true,
		unique: true,
	},
	address: {
		type: String,
		required: true,
		unique: true,
	},
	layer_zero_plan: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Layer Zero Plan',
	},
});

export const WalletModel = mongoose.model<IWallet>('Wallet', WalletSchema);
