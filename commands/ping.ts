import * as Discord from 'discord.js';
import { Command } from '../command';
import { PlayerScore } from '../database';
const ping : Command = {
	name: "ping",
	async execute(message : Discord.Message, args : String[]) {
		message.channel.send('Pong!');
		/*if (args.length >= 1) {
			try {
				const tag = await Test.create({
					gaming: args[0],
				});
				message.reply('DONE, CHECK DATABASE');
			} catch (e) {
				console.log(e);
				return message.reply('database error');
			}
		} else {
			message.reply('not enough arguments');
		}*/
	},
}
module.exports = ping;