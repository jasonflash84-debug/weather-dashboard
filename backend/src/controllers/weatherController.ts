import axios from 'axios';
import { WeatherData, ForecastData } from '../types/index';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherController {
  async getCurrentWeather(city: string): Promise<WeatherData> {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: 'metric'
        }
      });

      const data = response.data;
      return {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg || 0,
        cloudiness: data.clouds.all,
        visibility: data.visibility,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timestamp: data.dt
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch weather: ${error.message}`);
    }
  }

  async getForecast(city: string): Promise<ForecastData> {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: 'metric'
        }
      });

      const data = response.data;
      const forecasts = data.list
        .filter((_: any, index: number) => index % 8 === 0)
        .map((forecast: any) => ({
          date: new Date(forecast.dt * 1000).toISOString(),
          maxTemp: forecast.main.temp_max,
          minTemp: forecast.main.temp_min,
          description: forecast.weather[0].description,
          icon: forecast.weather[0].icon,
          precipitationProbability: forecast.pop * 100,
          windSpeed: forecast.wind.speed
        }));

      return {
        city: data.city.name,
        country: data.city.country,
        forecasts
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
  }

  async searchLocations(query: string): Promise<any[]> {
    try {
      const response = await axios.get(`${BASE_URL}/find`, {
        params: {
          q: query,
          appid: OPENWEATHER_API_KEY,
          type: 'like',
          cnt: 10
        }
      });

      return response.data.list.map((location: any) => ({
        city: location.name,
        country: location.sys.country,
        latitude: location.coord.lat,
        longitude: location.coord.lon,
        temperature: location.main.temp,
        description: location.weather[0].main
      }));
    } catch (error: any) {
      throw new Error(`Failed to search locations: ${error.message}`);
    }
  }

  async getWeatherByCoordinates(latitude: number, longitude: number): Promise<WeatherData> {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat: latitude,
          lon: longitude,
          appid: OPENWEATHER_API_KEY,
          units: 'metric'
        }
      });

      const data = response.data;
      return {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg || 0,
        cloudiness: data.clouds.all,
        visibility: data.visibility,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timestamp: data.dt
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch weather by coordinates: ${error.message}`);
    }
  }
}

export default new WeatherController();
