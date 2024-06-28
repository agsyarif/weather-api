import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const getWeather = async (location = '', startDate = '', endDate = '') => {
  try {
    return await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}/?key=${process.env.WEATHER_API_KEY}`);
  } catch (error) {
    return {
      status: 'error',
      message: error.message
    };
  }
};

export default {
  getWeather
};