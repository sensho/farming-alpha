import mongoose from 'mongoose';
import { ILayerZeroPlan } from './types';

const LayerZeroPlanSchema = new mongoose.Schema<ILayerZeroPlan>({
	wallet: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Wallet',
		required: true,
	},
	plan_name: {
		type: String,
		required: true,
	},
	min_deposit: {
		type: Number,
		required: true,
	},
	min_volume: {
		type: Number,
		required: true,
	},
	min_transactions: {
		type: Number,
		required: true,
	},
	volume_till_date_in_eth: {
		type: Number,
		required: true,
		default: 0,
	},
	transactions: {
		type: Number,
		required: true,
		default: 0,
	},
	isActive: {
		type: Boolean,
		required: true,
		default: false,
	},
	stargate: {
		stakes: {
			isActive: {
				type: Boolean,
				required: true,
				default: false,
			},
			start_date: {
				type: Date,
			},
			end_date: {
				type: Date,
			},
		},
		bridging: {
			isTransactionActive: {
				type: Boolean,
				required: true,
				default: false,
			},
			current_chain_code: {
				type: String,
				required: true,
				default: 'ethereum',
			},
			current_asset_code: {
				type: String,
				required: true,
				default: 'eth',
			},
		},
	},
});

export const LayerZeroPlanModel = mongoose.model<ILayerZeroPlan>(
	'Layer Zero Plan',
	LayerZeroPlanSchema
);
