import { DataSource, DataSourceOptions } from "typeorm";
require('dotenv').config();
console.log(process.env.DB_HOST)

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'nexios_nest',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js']
};


const datasource = new DataSource(dataSourceOptions)

export default datasource