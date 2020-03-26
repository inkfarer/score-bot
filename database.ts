import { Sequelize, Model, DataTypes, BuildOptions, STRING, INTEGER } from 'sequelize';
import * as config from './config.json';

const sequelize = new Sequelize('discordDB', config.dbuser, config.dbpw, {
	host: config.dbhost,
	dialect: 'mysql'
});

export class Test extends Model {
	public id : number;
	public gaming: string;
}

Test.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true,
	},
	gaming: {
		type: new DataTypes.STRING(255),
		allowNull: false,
	}
}, {
	tableName: 'tests',
	sequelize: sequelize,
});
Test.sync();

export const scores = sequelize.define('scores', {
	user_id: {
		type: STRING,
		unique: true,
	},
	user_score: INTEGER,
});