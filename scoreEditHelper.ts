import * as Discord from 'discord.js';
import { PlayerScore, addScore } from './database';
import { colors } from './bot';

export async function scorePlusMinus(msg : Discord.Message, action : 'subtract' | 'add') {
	if (checkMentions(msg)) {
		const mentioned = msg.mentions.users.array()[0];
		const scoreElem = await PlayerScore.findOne({where: {user_id: mentioned.id}});
		if (scoreElem) {
			if (action === 'subtract') {
				await scoreElem.update({score: scoreElem.score - 1});
			} else if (action === 'add') {
				await scoreElem.update({score: scoreElem.score + 1});
			}
			msg.reply(getEmbedSuccess(mentioned.username, scoreElem.score));
		} else {
			//if player has no score assigned in database, add it
			if (action === 'subtract') {
				addScore(mentioned.id, -1);
				msg.reply(getEmbedSuccess(mentioned.username, -1));
			} else if (action === 'add') {
				addScore(mentioned.id, 1);
				msg.reply(getEmbedSuccess(mentioned.username, 1));
			}
		}
	}
}

function checkMentions(msg : Discord.Message) : boolean {
	if (msg.mentions.users.size > 1) {
		msg.reply(getEmbedFailure('Please mention only one user.'));
		return false;
	} else if (msg.mentions.users.size < 1) {
		msg.reply(getEmbedFailure('Please mention an user.'));
		return false;
	} else return true;
}

function getEmbedSuccess(name : string, score : number) : Discord.MessageEmbed {
	const unit : string = score === 1 ? ' point' : ' points';
	return new Discord.MessageEmbed()
		.setColor(colors.green)
		.setTitle('Done!')
		.setDescription('Changed Values:')
		.addFields(
			{name: name, value: score + unit}
		);
}

export function getEmbedFailure(message : string) : Discord.MessageEmbed {
	return new Discord.MessageEmbed()
		.setColor(colors.red)
		.setTitle('Error!')
		.setDescription(message);
}