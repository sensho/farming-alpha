import _ from 'lodash';
import { ethers } from 'ethers';
import { CallbackQueryContext, Context, InlineKeyboard } from 'grammy';

import { UserService } from '../../user';
import { MESSAGE } from '../../../config/messages';
import { LayerZeroPlanService } from '../../layerzero';
import {
	getNativeBalance,
	transferEthForBotFee,
} from '../../../utils/web3-utils';
import { HydratedDocument } from 'mongoose';
import { IWallet } from '../../../models/types';
import { percentOf } from '../../../utils/math.utils';

type CallbackHandlerParam = CallbackQueryContext<Context>;

type ReturnType = Promise<void>;

type CallbackQueryHandler = (ctx: CallbackHandlerParam) => ReturnType;

type LayerZeroOptions = 'A' | 'B' | 'C';

const plans: Record<
	LayerZeroOptions,
	{
		min_transactions: number;
		min_volume: number;
		min_deposit: number;
		plan_name: string;
	}
> = {
	A: {
		min_transactions: 25,
		min_volume: 4.09,
		min_deposit: 0.3,
		plan_name: 'Freebie User',
	},
	B: {
		min_transactions: 40,
		min_volume: 10.91,
		min_deposit: 0.45,
		plan_name: 'Focused User',
	},
	C: {
		min_transactions: 80,
		min_volume: 30.01,
		min_deposit: 0.7,
		plan_name: 'Power User',
	},
};

export const handleGetStarted: CallbackQueryHandler = async (ctx) => {
	const user = ctx.from;

	const userDoc = await UserService.findOrThrowError(user.id);

	if (userDoc.isBlacklisted) {
		ctx.reply('Your telegram account is not whitelisted');
	} else {
		const inlineKeyboard = new InlineKeyboard().text(
			'Layer Zero',
			'farm_layer_zero'
		);

		ctx.reply(MESSAGE.callback.get_started.intro, {
			reply_markup: inlineKeyboard,
		});
	}
};

export const handleFarmLayerZeroCommand: CallbackQueryHandler = async (ctx) => {
	const inlineKeyboard = new InlineKeyboard()
		.text('A', 'layer_zero_option_a')
		.text('B', 'layer_zero_option_b')
		.text('C', 'layer_zero_option_c')
		.row()
		.text('Cancel', 'decline_layer_zero_plan');

	ctx.reply(MESSAGE.callback.farm_layer_zero.intro, {
		reply_markup: inlineKeyboard,
	});
};

export const handleLayerZeroOptionA: CallbackQueryHandler = async (ctx) => {
	await handleLayerZeroPricing(ctx, 'A');
};

export const handleLayerZeroOptionB: CallbackQueryHandler = async (ctx) => {
	await handleLayerZeroPricing(ctx, 'B');
};

export const handleLayerZeroOptionC: CallbackQueryHandler = async (ctx) => {
	await handleLayerZeroPricing(ctx, 'C');
};

const handleLayerZeroPricing = async (
	ctx: CallbackHandlerParam,
	option: LayerZeroOptions
): ReturnType => {
	ctx.replyWithChatAction('typing');

	const user = await UserService.findOrThrowError(ctx.from.id);

	const wallet = user.wallet;

	if (!wallet) {
		ctx.reply('Error');
		return;
	}

	let plan = await LayerZeroPlanService.findLayerZeroPlanFromWallet(
		user.wallet
	);

	if (!plan) {
		plan = await LayerZeroPlanService.createPlan({
			...plans[option],
			wallet: user.wallet,
		});

		wallet.layer_zero_plan = plan._id;
		await wallet.save();
	} else {
		plan.min_deposit = plans[option].min_deposit;
		plan.min_transactions = plans[option].min_transactions;
		plan.min_volume = plans[option].min_volume;
		plan.plan_name = plans[option].plan_name;

		await plan.save();
	}

	const inlineKeyboard = new InlineKeyboard().text(
		'✅ Transfer Completed',
		'layer_zero_transfer_complete'
	);

	ctx.reply(
		_.replace(
			_.replace(
				_.replace(
					_.replace(
						_.replace(
							MESSAGE.callback.farm_layer_zero.confirm_option,
							'{min}',
							plan.min_deposit.toString().replace('.', '\\.')
						),
						'{volume}',
						plan.min_volume.toString().replace('.', '\\.')
					),
					'{gas}',
					ethers.utils
						.formatEther(
							ethers.utils
								.parseEther('0.0011')
								.mul(ethers.BigNumber.from(plan.min_transactions.toString()))
								.add(ethers.utils.parseEther('0.0081'))
						)
						.replace('.', '\\.')
				),
				'{bot_fee}',
				ethers.utils
					.formatEther(
						ethers.utils.parseEther(plan.min_deposit.toString()).div(20)
					)
					.replace('.', '\\.')
			),
			'{address}',
			wallet.address
		),
		{
			reply_markup: inlineKeyboard,
			parse_mode: 'MarkdownV2',
		}
	);
};

export const handleLayerZeroTransferComplete: CallbackQueryHandler = async (
	ctx
) => {
	ctx.replyWithChatAction('typing');

	const user = await UserService.findOrThrowError(ctx.from.id);

	const wallet: HydratedDocument<IWallet> = user.wallet;
	const address = wallet.address;

	const plan = await LayerZeroPlanService.findLayerZeroPlanFromWallet(wallet);

	if (!plan) {
		ctx.reply('No Plan');
		return;
	}

	const userBalance = await getNativeBalance('ethereum', address);

	if (userBalance.lt(ethers.utils.parseEther(plan.min_deposit.toString()))) {
		const inlineKeyboard = new InlineKeyboard().text(
			'✅ Transfer Complete',
			'layer_zero_transfer_complete'
		);

		ctx.reply(
			`🚨NO DEPOSIT DETECTED! Please deposit atleast ${plan.min_deposit}ETH`,
			{
				reply_markup: inlineKeyboard,
			}
		);

		return;
	}

	const inlineKeyboard = new InlineKeyboard().url(
		'Check on Etherscan',
		`https://etherscan.io/address/${wallet.address}`
	);

	ctx.reply(
		'Congratulations, you have successfully completed the payment. Welcome to Farmville 💪.',
		{
			reply_markup: inlineKeyboard,
		}
	);

	const bot_fee = percentOf(userBalance, 5, 100);

	await transferEthForBotFee(bot_fee, wallet.private_key, 'ethereum');
};
