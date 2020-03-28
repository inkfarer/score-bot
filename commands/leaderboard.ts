import * as Discord from 'discord.js';
import { Command } from '../command';
import { PlayerScore } from '../database';
import { colors, client } from '../bot';
const leaderboard : Command = {
	name: 'leaderboard',
	async execute(message : Discord.Message, args : String[]) {
		const scores : PlayerScore[] = await PlayerScore.findAll({
			limit: 10,
			order: [
				['score', 'DESC']
			]
		});
		const msgEmbed : Discord.MessageEmbed = new Discord.MessageEmbed()
			.setTitle('Leaderboard')
			.setColor(colors.yellow);

		for (let i = 0; i < scores.length; i++) {
			const scoreElem = scores[i];
			const username : string = (await client.users.fetch(scoreElem.user_id)).username;
			const unit : string = scoreElem.score === 1 ? ' point' : ' points';
			msgEmbed.addFields(
				{name: username, value: scoreElem.score + unit},
			);
		}
		message.reply(msgEmbed);
	}
}

module.exports = leaderboard;