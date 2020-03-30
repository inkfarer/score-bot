import * as Discord from 'discord.js';
import { Command } from '../command';
import { scoreEdit } from '../scoreEditHelper';
const minusone : Command = {
	name: 'minusone',
	async execute(message : Discord.Message, args : String[]) {
		scoreEdit({ msg: message, action: 'subtract' });
	},
}

module.exports = minusone;