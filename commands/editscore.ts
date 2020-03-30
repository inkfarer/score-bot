import * as Discord from 'discord.js';
import { Command } from '../command';
import { colors } from '../bot';
import {getEmbedFailure, scoreEdit} from '../scoreEditHelper';
const editscore : Command = {
	name: 'editscore',
	async execute(message : Discord.Message, args : string[]) {
		const mentioned = message.mentions.users.array();
		for (let i = 0; i < mentioned.length; i++) {
			const mentionedUser : string = '<@!' + mentioned[i] + '>';
			const index : number = args.indexOf(mentionedUser);
			if (index != -1) {
				args.splice(index, 1);
			}
		}
		if (args.length > 1) {
			return message.reply(getEmbedFailure('Too many arguments!'));
		}
		const newValue : number = parseInt(args[0]);
		if (isNaN(newValue)) {
			return message.reply(getEmbedFailure('Couldn\'t find a number to edit to.'))
		}
		scoreEdit({msg: message, action: 'edit', newValue: newValue});
	}
}
module.exports = editscore;