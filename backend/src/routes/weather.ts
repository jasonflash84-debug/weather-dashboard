import express, { Router, Request, Response } from 'express';
import weatherController from '../controllers/weatherController';

const router: Router = express.Router();

// Get current weather for a city
router.get('/current', async (req: Request, res: Response) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
    const weather = await weatherController.getCurrentWeather(city as string);
    res.json({ success: true, data: weather });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get 5-day forecast
router.get('/forecast', async (req: Request, res: Response) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
    const forecast = await weatherController.getForecast(city as string);
    res.json({ success: true, data: forecast });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Search locations
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const results = await weatherController.searchLocations(q as string);
    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get weather by coordinates
router.get('/coordinates', async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    const weather = await weatherController.getWeatherByCoordinates(
      parseFloat(lat as string),
      parseFloat(lon as string)
    );
    res.json({ success: true, data: weather });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
