import * as Discord from 'discord.js';
import { Command } from '../command';
import { Sequelize, Model, DataTypes, BuildOptions, STRING, INTEGER } from 'sequelize';
import { scores, Test } from '../database';
const ping : Command = {
	name: "ping",
	async execute(message : Discord.Message, args : String[]) {
		message.channel.send('Pong!');
		if (args.length >= 1) {
			try {
				const tag = await Test.create({
					gaming: "WHOA"
				});
				message.reply('DONE, CHECK DATABASE PGO');
			} catch (e) {
				return message.reply(e);
			}
		} else {
			message.reply('args missing');
		}
	},
}
module.exports = ping;