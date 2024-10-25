import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TempNow() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/weather/daily/Delhi')
            .then(response => setWeatherData(response.data))
            .catch(error => console.error('Error fetching weather data:', error));
    }, []);

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const {
        name: cityName,
        main: { temp, feels_like, humidity },
        weather,
        wind: { speed: windSpeed },
    } = weatherData;

    // Get the icon code from the API response and create the icon URL.
    const weatherIcon = weather[0]?.icon;
    const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`; // URL for OpenWeatherMap icons
    const description = weather[0]?.description;
    const capitalizedDescription = description ? description.charAt(0).toUpperCase() + description.slice(1) : '';
    return (
        <div className='text-yellow-200 ml-5'>
            <div>
                <p className='font-bold text-3xl font-sans'>City Name: {cityName}</p>
            </div>
            <div className='flex items-center justify-between pt-12'>
                <div className='ml-6 items-center justify-center'>
                    <p className='text-3xl font-bold'>{Math.round(temp)}&#176; C</p>
                    <p>{capitalizedDescription}</p>
                </div>
                <div>
                    {/* Display the weather icon */}
                    <img src={iconUrl} alt={weather[0]?.description} />
                </div>
            </div>
            <div className='pt-16 flex gap-x-3 justify-between'>
                <div className='flex-col gap-2 items-center bg-slate-500 py-3 px-6 rounded-lg'>
                    <p className='text-xl'>Feels Like:</p>
                    <p className='text-center'>{Math.round(feels_like)}&#176; C</p>
                </div>
                <div className='flex-col gap-2 items-center bg-slate-500 py-3 px-6 rounded-lg'>
                    <p className='text-xl'>Chance of Rain:</p>
                    <p className='text-center'>0%</p>
                </div>
                <div className='flex-col gap-2 items-center bg-slate-500 py-3 px-6 rounded-lg'>
                    <p className='text-xl'>Wind Speed:</p>
                    <p className='text-center'>{Math.round(windSpeed * 3.6)} kmph</p>
                    {/* Converts m/s to kmph */}
                </div>
                <div className='flex-col gap-2 items-center bg-slate-500 py-3 px-6 rounded-lg'>
                    <p className='text-xl'>Humidity:</p>
                    <p className='text-center'>{humidity}%</p>
                </div>
            </div>
        </div>
    );
}
