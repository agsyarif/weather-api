import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import weatherService from '../src/services/weather.service';

describe('Weather Service', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('should fetch weather data successfully', async () => {
    const location = 'wonokromo';
    const startDate = '2023-01-01';
    const endDate = '2023-01-02';
    const responseData = { temperature: '27°C' };

    mock.onGet(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}/?key=${process.env.WEATHER_API_KEY}`)
        .reply(200, responseData);

    const response = await weatherService.getWeather(location, startDate, endDate);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  it('should handle errors correctly', async () => {
    const location = 'wonokromo';
    const startDate = '2023-01-01';
    const endDate = '2023-01-02';
    const errorMessage = 'Network Error';

    mock.onGet(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}/?key=${process.env.WEATHER_API_KEY}`)
        .networkError();

    const response = await weatherService.getWeather(location, startDate, endDate);

    expect(response.status).toBe('error');
    expect(response.message).toBe(errorMessage);
  });
});
