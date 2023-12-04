import { Context } from 'grammy';

type MessageHandler = (ctx: Context) => Promise<void>;

export const handleMessage: MessageHandler = async (ctx) => {
	ctx.reply('Unknown command');
};
