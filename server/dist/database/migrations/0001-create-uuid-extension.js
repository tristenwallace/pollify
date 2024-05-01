"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface) => {
        await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    },
    down: async (queryInterface) => {
        await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
    },
};
