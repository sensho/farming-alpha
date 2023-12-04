import { CommandContext, Context, InlineKeyboard } from 'grammy';

import { MESSAGE } from '../../../config/messages';
import { UserService } from '../../user';

export const handleStart = async (
	ctx: CommandContext<Context>
): Promise<void> => {
	ctx.replyWithChatAction('typing');

	const user = ctx.from;

	if (!user) {
		ctx.reply('ER1: NO_USER');
		return;
	}

	if (user.is_bot) {
		ctx.reply('ER2: BOT_USER');
		return;
	}

	if (ctx.chat.type !== 'private') {
		ctx.reply('Farmville is only supposed to be used in PMs');
		return;
	}

	await UserService.findOrCreateUser(user.id, user.first_name, user.last_name);

	const inlineKeyboard = new InlineKeyboard()
		.url('What is Farmville?', 'https://sensho-dao.gitbook.io/farmville-bot/')
		.row()
		.text("Let's Get Started", 'get_started');

	await ctx.replyWithPhoto('https://farmville-bot.s3.amazonaws.com/logo.png', {
		caption: MESSAGE.commands.start.welcome_message,
		reply_markup: inlineKeyboard,
	});
};
