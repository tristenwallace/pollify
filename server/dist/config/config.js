"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Load dotenv if environment variables are not already set
if (!process.env.POSTGRES_USER) {
    const dotenv = require('dotenv');
    const envPath = path_1.default.resolve(__dirname, `../../environment/.env.${process.env.NODE_ENV || 'development'}`);
    dotenv.config({ path: envPath });
}
// Configuration for all environments
const Config = {
    development: {
        username: process.env.POSTGRES_USER || '',
        password: process.env.POSTGRES_PASSWORD || '',
        database: process.env.POSTGRES_NAME || '',
        host: process.env.POSTGRES_HOST || '',
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
        dialect: 'postgres',
        dialectOptions: {},
    },
    test: {
        username: process.env.POSTGRES_USER || '',
        password: process.env.POSTGRES_PASSWORD || '',
        database: process.env.POSTGRES_NAME || '',
        host: process.env.POSTGRES_HOST || '',
        port: parseInt(process.env.POSTGRES_PORT || '5433', 10),
        dialect: 'postgres',
        dialectOptions: {},
    },
    production: {
        username: process.env.POSTGRES_USER || '',
        password: process.env.POSTGRES_PASSWORD || '',
        database: process.env.POSTGRES_NAME || '',
        host: process.env.POSTGRES_HOST || '',
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: true,
                ca: fs_1.default.readFileSync('./certs/us-east-2-bundle.pem').toString(),
            },
        },
    },
};
exports.default = Config;
module.exports = Config;
