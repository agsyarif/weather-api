import { redisClient } from '../src/config/redis.config.js';
import weatherService from "../src/services/weather.service.js";
import weatherController from '../src/controllers/weather.controller.js';

jest.mock('../src/config/redis.config.js');
jest.mock('../src/services/weather.service.js');

describe('Weather Controller', () => {
  let req, res, client;

  beforeAll(() => {
    originalConsoleError = console.error;
    console.error = jest.fn(); // Mock console.error, agar tidak muncul pada log test
  });

  afterAll(() => {
    console.error = originalConsoleError; // Restore original console.error
  });

  beforeEach(() => {
    req = {
      query: {
        location: 'wonokromo',
        startDate: '2023-01-01',
        endDate: '2023-01-02'
      }
    };

    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    client = {
      get: jest.fn(),
      set: jest.fn()
    };

    redisClient.mockReturnValue(client);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return cached data if available', async () => {
    const cachedData = JSON.stringify({ temperature: '27°C' });
    client.get.mockResolvedValue(cachedData);

    await weatherController.index(req, res);

    expect(client.get).toHaveBeenCalledWith('wonokromo:2023-01-01:2023-01-02');
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: JSON.parse(cachedData),
    });
  });

  it('should fetch data from weather service if not cached', async () => {
    const weatherData = { data: { temperature: '27°C' } };
    client.get.mockResolvedValue(null);
    weatherService.getWeather.mockResolvedValue(weatherData);

    await weatherController.index(req, res);

    expect(client.get).toHaveBeenCalledWith('wonokromo:2023-01-01:2023-01-02');
    expect(weatherService.getWeather).toHaveBeenCalledWith('wonokromo', '2023-01-01', '2023-01-02');
    expect(client.set).toHaveBeenCalledWith('wonokromo:2023-01-01:2023-01-02', JSON.stringify(weatherData.data), {
      EX: 43200,
      NX: true
    });
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: weatherData.data,
    });
  });

  it('should handle errors', async () => {
    const errorMessage = 'Something went wrong';
    client.get.mockRejectedValue(new Error(errorMessage));

    await weatherController.index(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Failed to fetch weather data',
      error: errorMessage,
    });
  });
});
