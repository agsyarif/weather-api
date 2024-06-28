// import { createClient } from 'redis';
// import dotenv from 'dotenv';
// dotenv.config();

// let client;

// const redisClient = () => {
//   if (!client) {
//     client = createClient({
//       url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
//     });

//     client.on('error', err => {
//       console.error('Redis Client Error:', err);
//     });
    
//     client.connect();
//   }
//   return client;
// };

// export { redisClient };

import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

let client;

const redisClient = () => {
  if (!client) {
    client = createClient({
      url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    });

    client.on('error', err => {
      console.error('Redis Client Error:', err);
    });
    
    client.connect();
  }
  return client;
};

const resetClient = () => {
  client = null;
};

export { redisClient, resetClient };
