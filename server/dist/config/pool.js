"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const config_1 = __importDefault(require("./config"));
const env = process.env.NODE_ENV || 'development';
const config = config_1.default[env];
console.log(`pool-env: ${env}`);
console.log(`pool-config-user: ${config.database}`);
exports.pool = new pg_1.Pool({
    user: config.username,
    password: config.password,
    host: config.host,
    database: config.database,
    port: config.port,
});
