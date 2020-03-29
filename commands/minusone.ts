import * as Discord from 'discord.js';
import { Command } from '../command';
import { scorePlusMinus } from '../scoreEditHelper';
const minusone : Command = {
	name: 'minusone',
	async execute(message : Discord.Message, args : String[]) {
		scorePlusMinus({ msg: message, action: 'subtract' });
	},
}

module.exports = minusone;