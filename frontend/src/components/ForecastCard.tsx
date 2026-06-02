import { Cloud, CloudRain, Sun } from 'lucide-react'

interface ForecastCardProps {
  forecast: {
    date: string
    maxTemp: number
    minTemp: number
    description: string
    precipitationProbability: number
  }
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  const getIcon = (desc: string) => {
    if (desc.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-400" />
    if (desc.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-400" />
    return <Sun className="w-8 h-8 text-yellow-400" />
  }

  const date = new Date(forecast.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 text-white text-center hover:bg-opacity-20 transition-all">
      <p className="font-semibold mb-2">{date}</p>
      <div className="flex justify-center mb-3">
        {getIcon(forecast.description)}
      </div>
      <div className="text-sm">
        <div className="font-bold">{Math.round(forecast.maxTemp)}°</div>
        <div className="opacity-75 text-xs">{Math.round(forecast.minTemp)}°</div>
      </div>
      <p className="text-xs opacity-75 mt-2 capitalize">{forecast.description}</p>
      {forecast.precipitationProbability > 0 && (
        <p className="text-xs mt-1 text-blue-300">💧 {Math.round(forecast.precipitationProbability)}%</p>
      )}
    </div>
  )
}
