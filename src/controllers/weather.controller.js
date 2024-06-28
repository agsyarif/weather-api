import { redisClient } from '../config/redis.config.js';
import weatherService from "../services/weather.service.js"

const index = async (req, res) => {
  const { location, startDate, endDate } = req.query;

  try {
    const key = `${location}:${startDate}:${endDate}`;
    const client = redisClient();

    let data = await client.get(key);

    if (!data) {
      const weatherData = await weatherService.getWeather(location, startDate, endDate);
      data = JSON.stringify(weatherData.data);

      await client.set(key, data, {
        EX: 43200, // 12 jam
        NX: true
      });
    }
    
    res.json({
      status: 'success',
      data: JSON.parse(data),
    });

  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch weather data',
      error: error.message,
    });
  }
}

export default {
  index
}