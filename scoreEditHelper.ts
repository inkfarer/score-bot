import * as Discord from 'discord.js';
import { PlayerScore, addScore } from './database';
import { colors } from './bot';
import { Sequelize } from 'sequelize';

export async function scorePlusMinus({ msg, action }: { msg: Discord.Message; action: 'subtract' | 'add'; }) {
	if (checkMentions(msg) && checkRoles(msg)) {
		const mentioned = msg.mentions.users.array();
		const idList : Array<string> = [];
		
		for (let i = 0; i < mentioned.length; i++) {
			idList.push(mentioned[i].id);
		}
		
		var literal : string;
		if (action === 'subtract') {
			literal = 'score - 1';
		} else if (action === 'add') {
			literal = 'score + 1';
		}

		await PlayerScore.update(
			{
				score: Sequelize.literal(literal),
			},
			{
				where: {
					user_id: idList
				}
			}
		);

		const scores : PlayerScore[] = await PlayerScore.findAll({
			where: {
				user_id: idList
			}
		});

		const msgEmbed : Discord.MessageEmbed = getEmbedSuccess();

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
				if (action === 'add') {
					addScore(id, 1);
					msgEmbed.addFields(
						{name: username, value: '1 point'},
					);
				} else if (action === 'subtract') {
					addScore(id, -1);
					msgEmbed.addFields(
						{name: username, value: '-1 points'},
					);
				}
			}
		}
		msg.reply(msgEmbed);
	}
}

function checkMentions(msg : Discord.Message) : boolean {
	if (msg.mentions.users.size < 1) {
		msg.reply(getEmbedFailure('Please mention an user.'));
		return false;
	} else return true;
}

function checkRoles(msg : Discord.Message) : boolean {
	if (msg.member.roles.cache.some(role => role.name === 'ScoreBot')) {
		return true;
	} else {
		msg.reply(getEmbedFailure('You are missing the "ScoreBot" role!'));
		return false;
	}
	
}

function getEmbedSuccess() : Discord.MessageEmbed {
	return new Discord.MessageEmbed()
		.setColor(colors.green)
		.setTitle('Done!')
		.setDescription('Changed Values:');
}

export function getEmbedFailure(message : string) : Discord.MessageEmbed {
	return new Discord.MessageEmbed()
		.setColor(colors.red)
		.setTitle('Error!')
		.setDescription(message);
}