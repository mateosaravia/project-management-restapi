import redis from 'redis';

let client: any = null;

const createClient = () => {
  client = redis.createClient({
    url: process.env.REDIS_URL,
  });

  client.on('error', (err: Error) => {
    console.log('Error ' + err);
  });

  client.on('connect', () => {
    console.log('Redis client connected');
  });

  client.connect();

  return client;
};

export const getClient = () => {
  if (!client) {
    createClient();
  }
  return client;
};
