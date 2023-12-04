import { IUser } from '../../models/types';
import { UserModel } from '../../models/user.model';
import { HydratedDocument } from 'mongoose';
import { WalletService } from '../wallet';
import { generateWallet } from '../../utils/wallet.utils';

type UserDoc = HydratedDocument<IUser>;

const whitelisted = [
	1629374036, 836694707, 5203238015, 1504829935, 735568202, 6552977585,
	1535332022, 1125582908, 5301392265, 316193649, 1303918603, 1964207039,
	1708549314, 707708290, 5536307760, 892565399, 5051498718, 839381836,
	1468231793, 572884274, 1377151141, 757377611, 459974088, 1082358456,
	5066947251,
];

export class UserService {
	static findOrCreateUser = async (
		tgId: number,
		firstName: string,
		lastName?: string
	): Promise<UserDoc> => {
		let user = await UserModel.findOne({ telegram_user_id: tgId });

		if (!user) {
			const { privateKey, address } = generateWallet();

			const wallet = await WalletService.createWallet(privateKey, address);

			user = await UserModel.create({
				first_name: firstName,
				last_name: lastName,
				telegram_user_id: tgId,
				wallet: wallet,
				isBlacklisted: whitelisted.indexOf(tgId) === -1,
			});
		}

		return user;
	};

	static findOrThrowError = async (tgId: number): Promise<UserDoc> => {
		const user = await UserModel.findOne({ telegram_user_id: tgId }).populate(
			'wallet'
		);

		if (!user) {
			throw new Error('ERR_CHCK_14');
		}

		return user;
	};
}
