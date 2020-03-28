import * as Discord from 'discord.js';
import { Command } from '../command';
import { PlayerScore } from '../database';
import { colors } from '../bot';
import { getEmbedFailure } from '../scoreEditHelper';
const getscore : Command = {
	name: 'getscore',
	async execute(message : Discord.Message, args : String[]) {
		if (message.mentions.users.size < 1) {
			message.reply(getEmbedFailure('Please mention an user.'));
		} else {
			const mentioned : Discord.User[] = message.mentions.users.array();
			const idList : Array<string> = [];
			const msgEmbed : Discord.MessageEmbed = new Discord.MessageEmbed()
				.setColor(colors.green)
				.setTitle('Here you go!');

			//find scores from database
			for (let i = 0; i < mentioned.length; i++) {
				idList.push(mentioned[i].id);
			}
			const scores : PlayerScore[] = await PlayerScore.findAll({
				where: {
					user_id: idList
				}
			});

			for (let i = 0; i < mentioned.length; i++) {
				//find player score by id - if it doesn't exist, assume it's 0
				const username = mentioned[i].username;
				const id = mentioned[i].id;
				const scoreElem = scores.find(score => score.user_id === id);

				if (scoreElem) {
					const unit : string = scoreElem.score === 1 ? ' point' : ' points';
					msgEmbed.addFields(
						{name: username, value: scoreElem.score + unit},
					);
				} else {
					msgEmbed.addFields(
						{name: username, value: '0 points'},
					);
				}
			}
			message.reply(msgEmbed);
		}
	},
}

module.exports = getscore;