import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as config from './config.json';
import { Command } from './command';
//wtf

const client : Discord.Client = new Discord.Client();
const commands : Discord.Collection<String, Command> = new Discord.Collection();

const commandFiles : String[] = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (msg : Discord.Message) => {
	if (msg.content.startsWith(config.prefix)) {
		const input : String[] = msg.content.slice(config.prefix.length).split(' ');
		const command : String = input.shift();

		if (command === 'ping') {
			commands.get('ping').execute(msg, input);
		}
	}
});

client.login(config.token);