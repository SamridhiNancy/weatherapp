import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TodayForecast() {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/weather/dailyForecast/Delhi')
            .then(response => {
                console.log('API Response:', response.data);
                setWeatherData(response.data);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }, []);

    const formatTime = (time) => {
        const [hourMinute, period] = time.split(' ');
        return { hourMinute, period };
    };

    return (
        <div className="bg-gray-900 rounded-xl p-4 mt-6">
            <h2 className="text-gray-300 font-bold mb-4 text-2xl">TODAY'S FORECAST</h2>
            <div className="flex justify-between items-center">
                {Array.isArray(weatherData) && weatherData.map((data, index) => {
                    const { hourMinute, period } = formatTime(data.time);
                    return (
                        <div key={index} className="flex flex-col items-center text-gray-300 gap-5">
                            <div className=' flex-col items-center'>
                                <p className="text-lg">{hourMinute}</p>
                                <p className="text-sm text-center">{period}</p>
                            </div>
                            <img src={data.icon} alt={`Weather icon for ${data.temp}`} className="w-16 h-16" />
                            <span className="text-lg font-semibold">{data.temp}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
