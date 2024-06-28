import { createClient } from 'redis';
import { redisClient, resetClient } from '../src/config/redis.config';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('redis', () => ({
  createClient: jest.fn()
}));

describe('Redis Client', () => {
  let mockClient;

  beforeEach(() => {
    mockClient = {
      on: jest.fn(),
      connect: jest.fn()
    };
    createClient.mockReturnValue(mockClient);
    process.env.REDIS_USERNAME = 'testuser';
    process.env.REDIS_PASSWORD = 'testpassword';
    process.env.REDIS_HOST = 'localhost';
    process.env.REDIS_PORT = '6379';
  });

  afterEach(() => {
    jest.clearAllMocks();
    resetClient();
  });

  it('should create a new client if none exists', () => {
    const clientInstance = redisClient();

    expect(createClient).toHaveBeenCalledWith({
      url: 'redis://testuser:testpassword@localhost:6379'
    });
    expect(mockClient.on).toHaveBeenCalledWith('error', expect.any(Function));
    expect(mockClient.connect).toHaveBeenCalled();
    expect(clientInstance).toBe(mockClient);
  });

  it('should return the existing client if it already exists', () => {
    const clientInstance1 = redisClient();
    const clientInstance2 = redisClient();

    expect(createClient).toHaveBeenCalledTimes(1);
    expect(clientInstance1).toBe(clientInstance2);
  });

  it('should log error on client error', () => {
    console.error = jest.fn();

    redisClient();

    const errorHandler = mockClient.on.mock.calls[0][1];
    errorHandler(new Error('Test Error'));

    expect(console.error).toHaveBeenCalledWith('Redis Client Error:', expect.any(Error));
  });
});
