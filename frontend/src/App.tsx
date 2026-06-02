import { useState, useEffect } from 'react'
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import './App.css'

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  description: string;
  icon: string;
  windSpeed: number;
  cloudiness: number;
  visibility: number;
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

  const fetchWeather = async (city: string) => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE_URL}/weather/current?city=${city}`)
      if (!response.ok) throw new Error('Weather not found')
      const data = await response.json()
      setWeather(data.data)
      fetchForecast(city)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather')
    } finally {
      setLoading(false)
    }
  }

  const fetchForecast = async (city: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/weather/forecast?city=${city}`)
      if (!response.ok) throw new Error('Forecast not found')
      const data = await response.json()
      setForecast(data.data.forecasts || [])
    } catch (err) {
      console.error('Failed to fetch forecast:', err)
    }
  }

  const handleSearch = (city: string) => {
    if (city.trim()) {
      fetchWeather(city)
    }
  }

  const getWeatherIcon = (description: string) => {
    if (description.includes('rain')) return <CloudRain className="w-16 h-16 text-blue-400" />
    if (description.includes('cloud')) return <Cloud className="w-16 h-16 text-gray-400" />
    return <Sun className="w-16 h-16 text-yellow-400" />
  }

  useEffect(() => {
    fetchWeather('London')
  }, [])

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-400 to-blue-600 text-gray-800'}`}>
      {/* Header */}
      <header className="bg-opacity-50 backdrop-blur-md bg-white dark:bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cloud className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <Cloud className="w-12 h-12" />
            </div>
            <p className="mt-4">Loading weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Current Weather */}
        {weather && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Weather Card */}
            <div className={`lg:col-span-2 rounded-2xl p-8 backdrop-blur-md ${darkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-20'}`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-4xl font-bold">{weather.city}, {weather.country}</h2>
                  <p className="text-lg capitalize opacity-90 mt-2">{weather.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-bold">{Math.round(weather.temperature)}°C</div>
                  <p className="text-sm opacity-75 mt-2">Feels like {Math.round(weather.feelsLike)}°C</p>
                </div>
              </div>
              <div className="flex justify-center mb-6">
                {getWeatherIcon(weather.description)}
              </div>
            </div>

            {/* Weather Details */}
            <div className={`rounded-2xl p-6 backdrop-blur-md ${darkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-20'}`}>
              <h3 className="text-xl font-bold mb-4">Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Droplets className="w-5 h-5" />
                  <span>Humidity: {weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5" />
                  <span>Wind: {weather.windSpeed} m/s</span>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5" />
                  <span>Pressure: {weather.pressure} hPa</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5" />
                  <span>Visibility: {(weather.visibility / 1000).toFixed(1)} km</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cloud className="w-5 h-5" />
                  <span>Cloudiness: {weather.cloudiness}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5-Day Forecast */}
        {forecast.length > 0 && !loading && (
          <div>
            <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <ForecastCard key={index} forecast={day} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-opacity-50 backdrop-blur-md bg-gray-800 text-white text-center py-6 mt-12">
        <p>Weather Dashboard © 2024 | Powered by OpenWeatherMap API</p>
      </footer>
    </div>
  )
}

export default App
