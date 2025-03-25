'use strict';
const redis = require('redis');

const REDISHOST = process.env.REDISHOST || 'localhost';
const REDISPORT = process.env.REDISPORT || 6379;

console.log(`REDISHOST: ${REDISHOST}, REDISPORT: ${REDISPORT} `);

const client = redis.createClient({
  socket: {
    host: REDISHOST,
    port: REDISPORT,
  },
});

client.on('error', (err) => console.error('ERR:REDIS:', err));

async function connectAndWriteToRedis() {
  try {
    await client.connect();
    console.log('Connected to Redis');

    setInterval(async () => {
      const now = new Date();
      const key = now.toLocaleTimeString('en-GB', { hour12: false }); // hh:mm:ss format
      const value = now.toISOString(); // YYYY-MM-DDTHH:mm:ss.sssZ format

      try {
        await client.set(key, value);
        console.log(`Wrote to Redis: Key - ${key}, Value - ${value}`);
      } catch (err) {
        console.error('Error writing to Redis:', err);
      }
    }, 1000); // 1-second interval
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
}

connectAndWriteToRedis();

// Optional: Handle process termination gracefully
process.on('SIGINT', async () => {
  console.log('Closing Redis connection...');
  try {
      await client.quit();
      console.log('Redis connection closed.');
      process.exit(0);
  } catch (err){
      console.error('Error closing Redis connection:', err);
      process.exit(1);
  }
});
