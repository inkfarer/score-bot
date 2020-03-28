import { Sequelize, Model, DataTypes, BuildOptions, STRING, INTEGER } from 'sequelize';
import * as config from './config.json';

const sequelize = new Sequelize('discordDB', config.dbuser, config.dbpw, {
	host: config.dbhost,
	dialect: 'mysql'
});

export class PlayerScore extends Model {
	//store these as strings because we aren't going math and these get fairly big
	public user_id : string;
	public score : number;
};

PlayerScore.init({
	user_id: {
		type: new DataTypes.STRING(255),
		primaryKey: true,
	},
	score: {
		type: DataTypes.INTEGER,
	},
}, {
	tableName: 'player_scores',
	sequelize: sequelize,
});
PlayerScore.sync();

export async function addScore(id : string, score: number) {
	try {
		await PlayerScore.create({
			user_id: id,
			score: score,
		});
		return 'success';
	} catch (e) { }
};