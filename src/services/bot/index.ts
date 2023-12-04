import { Bot, CallbackQueryContext, CommandContext, Context } from 'grammy';
import {
	handleFarmLayerZeroCommand,
	handleGetStarted,
	handleLayerZeroOptionA,
	handleLayerZeroOptionB,
	handleLayerZeroOptionC,
	handleLayerZeroTransferComplete,
} from './handlers/callback.handlers';
import { handleStart } from './handlers/command.handlers';
import { handleMessage } from './handlers/message.handlers';
import { Callback, Command } from './types';

const COMMAND_ACTIONS: Record<
	Command,
	(ctx: CommandContext<Context>) => Promise<void>
> = {
	start: handleStart,
};

const CALLBACK_ACTIONS: Record<
	Callback,
	(ctx: CallbackQueryContext<Context>) => Promise<void>
> = {
	get_started: handleGetStarted,
	farm_layer_zero: handleFarmLayerZeroCommand,
	layer_zero_option_a: handleLayerZeroOptionA,
	layer_zero_option_b: handleLayerZeroOptionB,
	layer_zero_option_c: handleLayerZeroOptionC,
	layer_zero_transfer_complete: handleLayerZeroTransferComplete,
};

export class FarmingBot {
	bot: Bot;

	constructor() {
		const BOT_TOKEN = process.env['BOT_TOKEN'];

		if (!BOT_TOKEN) {
			throw Error('BOT_CONN_ERR: Bot token not provided');
		}

		this.bot = new Bot(BOT_TOKEN);
	}

	start = () => {
		Object.keys(COMMAND_ACTIONS).forEach((command) => {
			this.bot.command(command, COMMAND_ACTIONS[command as Command]);
		});

		Object.keys(CALLBACK_ACTIONS).forEach((trigger) => {
			this.bot.callbackQuery(trigger, CALLBACK_ACTIONS[trigger as Callback]);
		});

		this.bot.on('message', handleMessage);

		this.bot.start();
	};
}
