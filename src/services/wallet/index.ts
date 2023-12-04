import { IWallet } from '../../models/types';
import { WalletModel } from '../../models/wallet.model';
import { HydratedDocument } from 'mongoose';

export class WalletService {
	static getWalletFromAddress = async (address: string) => {
		return await WalletModel.findOne({ address });
	};

	static getWalletFromPk = async (pk: string) => {
		return await WalletModel.findOne({ private_key: pk });
	};

	static createWallet = async (
		pk: string,
		address: string
	): Promise<HydratedDocument<IWallet>> => {
		return await WalletModel.create({
			address: address,
			private_key: pk,
		});
	};
}
