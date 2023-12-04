import mongoose from 'mongoose';
import { IUser } from './types';

const UserSchema = new mongoose.Schema<IUser>({
	telegram_user_id: {
		type: Number,
		required: true,
		unique: true,
	},
	first_name: {
		type: String,
	},
	last_name: {
		type: String,
	},
	isBlacklisted: {
		type: Boolean,
		default: true,
	},
	wallet: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'Wallet',
		required: true,
		unique: true,
	},
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
