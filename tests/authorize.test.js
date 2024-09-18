const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const redis = require('../services/redisClient');
require('./mocks');


describe('JWT Authentication Middleware', () => {

    it('should authenticate valid JWT token', async () => {
        const res = await request(app)
            .get('/data')
            .set('Authorization', 'Bearer valid_token');

        expect(res.status).toEqual(200);

        expect(res.body).toHaveProperty('name', 'ali');
        expect(jwt.verify).toHaveBeenCalledWith(
            'valid_token',
            'your_secret_key',
            expect.any(Function)
        );
    });

    it('should return 403 for invalid JWT token', async () => {
        const res = await request(app)
            .get('/data')
            .set('Authorization', 'Bearer invalid_token');

        expect(res.status).toEqual(403);
        console.log("res.body", res.body)

        expect(res.body.message).toEqual('Access denied');
    });

    it('should return 403 for expired JWT token', async () => {
        const res = await request(app)
            .get('/data')
            .set('Authorization', 'Bearer expired_token');

        expect(res.status).toEqual(403);
        expect(res.body.message).toBe('Token expired');
    });

    it('should return 401 if no token is provided', async () => {
        const res = await request(app)
            .get('/data');

        expect(res.status).toEqual(401);
        expect(res.body.message).toBe('Unauthorized');
    });

    afterAll(async () => {
        await redis.disconnect();
        // jest.resetModules();
        // بستن اتصال Redis
    });
    beforeAll(async () => {
        await redis.flushdb();
    });
});

