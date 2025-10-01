const redis = require('redis');

const client = redis.createClient({
    url: 'redis://127.0.0.1:6379' // default local Redis
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
    console.log('Connected to Redis');
})();

module.exports = client;
