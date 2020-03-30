import * as Discord from 'discord.js';
import { Command } from '../command';
import { scoreEdit } from '../scoreEditHelper';
const plusone : Command = {
	name: 'plusone',
	async execute(message : Discord.Message, args : String[]) {
		scoreEdit({ msg: message, action: 'add' });
	},
}

module.exports = plusone;