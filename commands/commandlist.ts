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
			.setFooter('Bot by inkfarer#6942 - inkfarer.com')
			.addFields(
				{name: prefix + 'leaderboard, ' + prefix + 'lb', value: 'Display a leaderboard with the 10 highest scoring players.'},
				{name: prefix + 'getscore [players]', value: 'Get the score of one or more players.'},
				{name: prefix + 'plusone [players]', value: 'Increment the score of one or more players.'},
				{name: prefix + 'minusone [players]', value: 'Decrement the score of one or more players.'},
				{name: prefix + 'edit [players] [new score]', value: 'Edit the score of one or more players.'},
				{name: prefix + 'commands', value: 'Show this list.'}
			)
		);
	}
};

module.exports = commandlist;