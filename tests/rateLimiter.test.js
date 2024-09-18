const request = require('supertest');
const app = require('../app');
const {mockJwt} = require('./mocks');
const redis = require("../services/redisClient");

describe('Rate Limiting Middleware', () => {
    it('should allow requests under the limit', async () => {
        const res = await request(app).get('/data').set('Authorization', 'Bearer valid_token');
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('name', 'ali');
    });

    it('should block requests over the limit', async () => {
        for (let i = 0; i < 11; i++) {
            await request(app).get('/data').set('Authorization', 'Bearer valid_token');
        }
        const res = await request(app).get('/data').set('Authorization', 'Bearer valid_token');
        expect(res.status).toEqual(429);
        expect(res.body.message).toBe('Too many requests, please try again later.');
    });

    afterAll(async () => {
        await redis.disconnect();
    });

    beforeAll(async () => {
        await redis.flushdb();
    });
});
