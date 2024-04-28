import request from 'supertest';
import { startServer } from '../server';
import sequelize from '../config/sequelize';
import { Poll } from '../database/models/poll';
import { Vote } from '../database/models/vote';
import { User } from '../database/models/user';

describe('Poll API', () => {
    let serverInstance: { server: import('http').Server, port: number };
    let app: string;
    let userToken: string;
    let testUser: User;

    beforeAll(async () => {
        serverInstance = await startServer();
        app = `http://localhost:${serverInstance.port}`;

        // Create a test user
        testUser = await User.create({
            username: `testuser_${Date.now()}`,
            password: '$2b$10$Tmh5BMmRudQ/zs4OsK5DluEkPuuoFtxglMKUY8/ug3mE6atADF3y2',
            name: 'Test User'
        });

        // Login to get a token
        const loginResponse = await request(app)
            .post('/user/login')
            .send({
                username: testUser.username,
                password: 'password123',
            });

        if (loginResponse.status !== 200) {
            console.error('Failed to login:', loginResponse.body);
            throw new Error('Failed to login test user');
        }

        userToken = loginResponse.body.token;

        // Clear existing data
        await Poll.destroy({ where: {} });
        await Vote.destroy({ where: {} });
    });

    afterAll(async () => {
        // Cleanup users to avoid affecting other tests
        await User.destroy({ where: { id: testUser.id } });
        await sequelize.close();
        await serverInstance.server.close();
    });

    describe('POST /polls', () => {
        it('should create a new poll', async () => {
            const res = await request(app)
                .post('/polls')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    optionOne: 'Option 1',
                    optionTwo: 'Option 2',
                    userId: testUser.id
                })
                .expect(201);

            expect(res.body).toEqual(
                expect.objectContaining({
                    optionOne: 'Option 1',
                    optionTwo: 'Option 2',
                    userId: testUser.id
                }),
            );
        });

        it('should return 400 for missing poll details', async () => {
            const res = await request(app)
                .post('/polls')
                .set('Authorization', `Bearer ${userToken}`)
                .send({})
                .expect(400);

            expect(res.body).toHaveProperty('error');
        });
    });

    describe('POST /polls/:id/vote', () => {
        let pollId: string;

        beforeAll(async () => {
            const poll = await Poll.create({
                userId: testUser.id,
                optionOne: 'Option 1',
                optionTwo: 'Option 2'
            });
            pollId = poll.id;
        });

        it('should allow a user to vote on a poll', async () => {
            const res = await request(app)
                .post(`/polls/${pollId}/vote`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    pollId: pollId,
                    userId: testUser.id,
                    chosenOption: 1
                })
                .expect(200);

            expect(res.body).toHaveProperty('message', 'Vote recorded successfully');
        });
    });
});
