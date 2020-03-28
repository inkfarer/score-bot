import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as config from './config.json';
import { Command } from './command';
const client : Discord.Client = new Discord.Client();
const commands : Discord.Collection<String, Command> = new Discord.Collection();
const commandFiles : String[] = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

export const colors = {
	'red': '#f44336',
	'green': '#4caf50',
	'yellow': '#ffeb3b'
};

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
};

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (msg : Discord.Message) => {
	if (msg.content.startsWith(config.prefix)) {
		const input : String[] = msg.content.slice(config.prefix.length).split(' ');
		const command : String = input.shift();

		if (command === 'getscore') {
			commands.get('getscore').execute(msg, input);
		} else if (command === 'plusone') {
			commands.get('plusone').execute(msg, input);
		} else if (command === 'minusone') {
			commands.get('minusone').execute(msg, input);
		} else if (command === 'leaderboard' || command === 'lb') {
			commands.get('leaderboard').execute(msg, input);
		}
	}
});

client.login(config.token);