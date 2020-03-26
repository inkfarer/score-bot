import * as Discord from 'discord.js';
import { Command } from '../command';
import { scores, Test } from '../database';
const read : Command = {
	name: 'read',
	async execute(message : Discord.Message, args : String[]) {
		message.channel.send('Pong!');
		const list = await Test.findAll({attributes: ['gaming']});
		const listString = list.map(l => l.gaming).join(', ') || 'None';
		return message.channel.send(listString);
	},
}
module.exports = read;