import * as Discord from 'discord.js';
import { Command } from '../command';
import { PlayerScore } from '../database';
const leaderboard : Command = {
	name: 'leaderboard',
	async execute(message : Discord.Message, args : String[]) {
		const scores : PlayerScore[] = await PlayerScore.findAll();
	}
}

module.exports = leaderboard;