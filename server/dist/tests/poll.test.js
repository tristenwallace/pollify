"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
const sequelize_1 = __importDefault(require("../config/sequelize"));
const poll_1 = require("../database/models/poll");
const vote_1 = require("../database/models/vote");
const user_1 = require("../database/models/user");
describe('Poll API', () => {
    let serverInstance;
    let app;
    let userToken;
    let testUser;
    beforeAll(async () => {
        serverInstance = await (0, server_1.startRandomServer)();
        app = `http://localhost:${serverInstance.port}`;
        // Create a test user
        testUser = await user_1.User.create({
            username: `testuser_${Date.now()}`,
            password: '$2b$10$Tmh5BMmRudQ/zs4OsK5DluEkPuuoFtxglMKUY8/ug3mE6atADF3y2',
            name: 'Test User',
        });
        // Login to get a token
        const loginResponse = await (0, supertest_1.default)(app).post('/user/login').send({
            username: testUser.username,
            password: 'password123',
        });
        if (loginResponse.status !== 200) {
            console.error('Failed to login:', loginResponse.body);
            throw new Error('Failed to login test user');
        }
        userToken = loginResponse.body.token;
        // Clear existing data
        await poll_1.Poll.destroy({ where: {} });
        await vote_1.Vote.destroy({ where: {} });
    });
    afterAll(async () => {
        // Cleanup users to avoid affecting other tests
        await user_1.User.destroy({ where: { id: testUser.id } });
        await sequelize_1.default.close();
        await serverInstance.server.close();
    });
    describe('POST /polls', () => {
        it('should create a new poll', async () => {
            const res = await (0, supertest_1.default)(app)
                .post('/polls')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                optionOne: 'Option 1',
                optionTwo: 'Option 2',
                userId: testUser.id,
            })
                .expect(201);
            expect(res.body).toEqual(expect.objectContaining({
                optionOne: 'Option 1',
                optionTwo: 'Option 2',
                userId: testUser.id,
            }));
        });
        it('should return 400 for missing poll details', async () => {
            const res = await (0, supertest_1.default)(app)
                .post('/polls')
                .set('Authorization', `Bearer ${userToken}`)
                .send({})
                .expect(400);
            expect(res.body).toHaveProperty('error');
        });
    });
    describe('POST /polls/:id/vote', () => {
        let pollId;
        beforeAll(async () => {
            const poll = await poll_1.Poll.create({
                userId: testUser.id,
                optionOne: 'Option 1',
                optionTwo: 'Option 2',
            });
            pollId = poll.id;
        });
        it('should allow a user to vote on a poll', async () => {
            const res = await (0, supertest_1.default)(app)
                .post(`/polls/${pollId}/vote`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                pollId: pollId,
                userId: testUser.id,
                chosenOption: 1,
            })
                .expect(200);
            expect(res.body).toHaveProperty('message', 'Vote recorded successfully');
        });
    });
});
