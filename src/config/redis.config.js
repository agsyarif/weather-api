import { createClient } from 'redis';

let client;

const redisClient = () => {
  if (!client) {
    client = createClient();

    client.on('error', err => {
      console.error('Redis Client Error:', err);
    });
    
    client.connect();
  }
  return client;
};

export { redisClient };
