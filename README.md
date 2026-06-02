# Weather Dashboard

A full-stack weather dashboard application for web development, production deployment, and project management.

## Features

- 🌡️ **Real-time Weather Data** - Current conditions for any location
- 📅 **5-Day Forecast** - Extended weather predictions
- 🔍 **Location Search** - Find weather for any city worldwide
- 📍 **Geolocation** - Auto-detect user's location
- 🎨 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚠️ **Weather Alerts** - Critical weather warnings
- 🌙 **Dark Mode** - Eye-friendly interface
- 📊 **Dashboard Analytics** - Historical weather data tracking
- 🔐 **Secure API** - Backend proxy for API keys
- 💾 **Persistent Storage** - Save favorite locations

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Next generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing

### Backend
- **Node.js** with Express
- **TypeScript** - Type-safe development
- **PostgreSQL** - Database (optional)
- **Dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

### API
- **OpenWeatherMap API** - Weather data provider

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## API Endpoints

- `GET /api/weather/current?city={city}` - Get current weather
- `GET /api/weather/forecast?city={city}` - Get 5-day forecast
- `GET /api/weather/search?q={query}` - Search locations
- `GET /api/weather/coordinates?lat={lat}&lon={lon}` - Get weather by coordinates
- `POST /api/locations/favorite` - Save favorite location
- `GET /api/locations/favorites` - Get saved locations
- `DELETE /api/locations/favorite/:id` - Remove favorite location
- `GET /api/alerts` - Get weather alerts

## License

MIT License
