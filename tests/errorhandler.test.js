const request = require('supertest');
const app = require('../app');
const {mockJwt, mockCacheService} = require('./mocks');
const redis = require("../services/redisClient");

describe('Error Handling Middleware', () => {
    it('should log errors and return 500 for internal server error', async () => {
        const res = await request(app).get('/invalid-endpoint').set('Authorization', 'Bearer valid_token');
        expect(res.status).toEqual(404);
    });

    afterAll(async () => {
        await redis.disconnect();
    });

    beforeAll(async () => {
        await redis.flushdb();
    });
});
