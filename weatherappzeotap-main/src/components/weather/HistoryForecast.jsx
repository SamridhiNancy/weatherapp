import React, { useEffect, useState } from 'react';
import axios from 'axios';

// WeatherCard component for displaying individual forecast details
const WeatherCard = ({ date, weather, maxTemp, minTemp, icon }) => (
    <div className="flex justify-between items-center border-b border-gray-700 py-6 px-4">
        <div className="flex items-center space-x-4">
            <div className="text-lg font-medium text-white">{date}</div>
        </div>
        <div className='flex gap-5 items-start'>
            <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={weather}
                className="w-10 h-10"
            />
            <div className="text-white font-semibold text-lg">{weather}</div>
        </div>
        <div className="text-white font-bold text-lg">
            {maxTemp}°C
            <span className="text-gray-400 font-light"> / {minTemp}°C</span>
        </div>
    </div>
);

export default function HistoryForecast() {
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        // Replace 'Delhi' with the desired city or pass it as a prop.
        axios.get('http://localhost:4000/weather/weekly/Delhi')
            .then(response => {
                const formattedData = response.data.map(dayData => ({
                    date: new Date(dayData.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                    }),
                    weather: dayData.weather,
                    maxTemp: Math.round(dayData.temp_max),
                    minTemp: Math.round(dayData.temp_min),
                    icon: dayData.icon, // Use the icon code directly from the API
                }));
                setForecastData(formattedData);
            })
            .catch(error => console.error('Error fetching weekly forecast:', error));
    }, []);

    if (!forecastData.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-600 text-white max-w-md mx-auto rounded-lg shadow-lg h-[80%]">
            <div className="text-2xl font-sans font-bold text-center pb-4 pt-4">7-DAY FORECAST</div>
            <div className="divide-y divide-gray-700">
                {forecastData.map((item, index) => (
                    <WeatherCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
}
