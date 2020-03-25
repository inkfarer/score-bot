import * as Discord from 'discord.js';
import * as config from './config.json';
const client : Discord.Client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (msg : Discord.Message) => {
	if (msg.content === 'ping') {
		msg.reply('pong');
	}
});

client.login(config.token);