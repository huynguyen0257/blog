// import 'dotenv/config';
require('dotenv').config();
import { DataSource } from 'typeorm';

// TODO: Fix bug migration generate
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: ['dist/libs/**/*.js'],
    subscribers: [],
    migrations: ['migration/tables/**/*'],
});

console.log(`AppDataSource,`, {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: ['dist/libs/**/*.js'],
    subscribers: [],
    migrations: ['migration/tables/**/*'],
});
