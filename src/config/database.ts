import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: "test",
  user: "root",
  password: "6749",
  host: "localhost",
  port: 3306,
});

export default sequelize; 