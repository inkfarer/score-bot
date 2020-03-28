import * as Discord from 'discord.js';
import { Command } from '../command';
import { scorePlusMinus } from '../scoreEditHelper';
const plusone : Command = {
	name: 'plusone',
	async execute(message : Discord.Message, args : String[]) {
		scorePlusMinus(message, 'add');
	},
}

module.exports = plusone;