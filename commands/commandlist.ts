import * as Discord from 'discord.js';
import { Command } from '../command';
import { colors } from '../bot';
import {prefix} from '../config.json';
const commandlist : Command = {
	name: 'commandlist',
	async execute(message : Discord.Message, args : String[]) {
		message.reply(new Discord.MessageEmbed()
			.setTitle('List of commands')
			.setColor(colors.green)
			.addFields(
				{name: prefix + 'leaderboard', value: 'Display a leaderboard with the 10 highest scoring players.'},
				{name: prefix + 'getscore [users]', value: 'Get the score of one or more users.'},
				{name: prefix + 'plusone [users]', value: 'Increment the score of one or more players. (Requires proper permission)'},
				{name: prefix + 'minusone [users]', value: 'Decrement the score of one or more players. (Requires proper permission)'},
				{name: prefix + 'commands', value: 'Show this list.'}
			)
		);
	}
};

module.exports = commandlist;