import * as Discord from 'discord.js';
import { Command } from '../command';
const ping : Command = {
	name: "ping",
	execute(message : Discord.Message, args : String[]) {
		message.channel.send('Pong!');
	},
}
module.exports = ping;