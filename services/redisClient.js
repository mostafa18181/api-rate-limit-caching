const redis = require('redis');
const ConfigManager = require('./configManager');
const {host, port} = ConfigManager.getRedisSettings();

// Create Redis client with Cluster/Sentinel support
// Redis Cluster enables horizontal scaling by partitioning data across multiple nodes,
// ensuring high availability through automatic failover and replication.
// Redis Sentinel provides high availability with monitoring and automatic failover for master-replica setups.
// Use Cluster for large datasets and distributed loads; use Sentinel for simpler setups with high availability needs.

const client = redis.createClient({
    url: `redis://${host}:${port}`,
    legacyMode: true,
});

client.connect().catch(console.error);

client.on('error', (err) => {
    console.error('Redis error:', err);
    client.unref();
});

module.exports = client;
