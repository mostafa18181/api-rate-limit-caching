const config = require('config');

class ConfigManager {
    static get(key, defaultValue = null) {
        try {
            const value = config.get(key);
            return value !== undefined ? value : defaultValue;
        } catch (error) {
            console.error(`Config key "${key}" not found. Using default value: ${defaultValue}`);
            return defaultValue;
        }
    }

    static getJwtSettings() {
        return {
            secretKey: this.get('jwt.secretKey', 'defaultSecret'),
            expiresIn: this.get('jwt.expiresIn', '1h')
        };
    }

    static getRedisSettings() {
        return {
            host: this.get('redis.host', 'localhost'),
            port: this.get('redis.port', 6379),
            ttl: this.get('redis.ttl', 60)
        };
    }

    static getRateLimiterSettings() {
        return {
            windowMs: this.get('rateLimiter.windowMs', 60000),
            maxRequests: this.get('rateLimiter.maxRequests', 10)
        };
    }

    static getWhitelistIPs() {
        return this.get('whitelist.allowedIPs', ['127.0.0.1']);
    }

    static getServerPort() {
        return this.get('server.port', 3000);
    }
}

module.exports = ConfigManager;
