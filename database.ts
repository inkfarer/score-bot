import { Sequelize, Model, DataTypes, BuildOptions, STRING, INTEGER } from 'sequelize';
import * as config from './config.json';

const sequelize : Sequelize = new Sequelize({
	storage: config.dbfile,
	dialect: 'sqlite'
});

export class PlayerScore extends Model {
	//store these as strings because we aren't going math and these get fairly big
	public user_id : string;
	public server_id : string;
	//we create a id column because both of the previous columns can come up multiple times
	public id : number;
	public score : number;
};

PlayerScore.init({
	user_id: {
		type: new DataTypes.STRING(255),
	},
	server_id: {
		type: new DataTypes.STRING(255),
	},
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
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

export async function addScore(id : string, IDServer : string, score: number) {
	try {
		await PlayerScore.create({
			user_id: id,
			server_id: IDServer,
			score: score,
		});
		//return 'success';
	} catch (e) {console.error(e) }
};
