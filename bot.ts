import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as config from './config.json';
import { Command } from './command';
//wtf
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';

const client : Discord.Client = new Discord.Client();
const commands : Discord.Collection<String, Command> = new Discord.Collection();

const commandFiles : String[] = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
}

//set up database

const sequelize = new Sequelize('discordDB', config.dbuser, config.dbpw, {
	host: config.dbhost,
	dialect: 'mysql'
});

async function testDB() {
	try {
		await sequelize.authenticate();
		console.log('DB connection successful');
	} catch (error) {
		console.error('DB error:', error)
	}
}

testDB();

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