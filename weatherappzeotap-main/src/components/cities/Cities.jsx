import React, { useEffect, useState } from 'react';
import { FaSun, FaCloudShowersHeavy, FaCloudSun, FaMoon, FaCloudMoonRain } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CityCharge({ cityName, temperature, weatherType, onSelect }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const hour = currentTime.getHours();
    const isDaytime = hour >= 6 && hour < 18;

    let weatherIcon;
    if (weatherType === 'Clear') {
        weatherIcon = isDaytime ? <FaSun size={90} color='yellow' className='p-5' /> : <FaMoon size={90} color='white' className='p-5' />;
    } else if (weatherType === 'Cloudy') {
        weatherIcon = isDaytime ? <FaCloudSun size={90} color='sky-blue' className='p-5' /> : <FaCloudMoonRain size={90} color='white' className='p-5' />;
    } else if (weatherType === 'Rain') {
        weatherIcon = <FaCloudShowersHeavy size={90} color={isDaytime ? 'blue' : 'white'} className='p-5' />;
    } else {
        weatherIcon = isDaytime ? <FaSun size={90} color='yellow' className='p-5' /> : <FaMoon size={90} color='white' className='p-5' />;
    }

    return (
        <div className='border-white border-2 py-4 flex justify-between items-center rounded-lg mb-4 w-full cursor-pointer' onClick={onSelect}>
            <div className='flex items-center'>
                {weatherIcon}
                <div>
                    <p className='text-4xl font-bold'>{cityName}</p>
                    <p>{formattedTime}</p>
                </div>
            </div>
            <div className='text-3xl font-bold mr-5'>
                {temperature}&#176; C
            </div>
        </div>
    );
}

function SelectedCity({ weatherData }) {
    return (
        <div className='w-full border-white border-2 mt-12 py-4 px-3 rounded-lg mb-4 ml-4 text-white'>
            <div className=' flex justify-between items-center px-5 border-b-2 pb-5'>
                <div>
                    <p className='text-4xl font-bold'>{weatherData.city}</p>
                    <p className=' text-gray-400 pt-2'>Chance of Rain: 0%</p>
                    <p className='text-4xl font-bold pt-7'>{Math.round(weatherData.avg_temp)}&#176; C</p>
                </div>
                <div>
                    <FaSun size={80} color='yellow' />
                </div>
            </div>
            <div className=' pt-5 border-b-2 pb-8'>
                <div>
                    <p className=' text-xl text-gray-400 px-5'>Today's Forecast</p>
                    <p className='text-gray-400 px-5'>{weatherData.summary}</p>
                </div>
            </div>
        </div>
    );
}

export default function City() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [citiesData, setCitiesData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCity, setSelectedCity] = useState(null);

    const cities = ['Delhi', 'Mumbai', 'Hyderabad', 'Bangalore', 'Kolkata'];

    useEffect(() => {
        const fetchWeatherData = async () => {
            const fetchedData = await Promise.all(
                cities.map(async (city) => {
                    const response = await fetch(`http://localhost:4000/weather/summary/${city}/${selectedDate.toISOString().split('T')[0]}`);
                    const data = await response.json();
                    return data.id ? data : null;
                })
            );
            setCitiesData(fetchedData.filter(Boolean));
        };

        fetchWeatherData();
    }, [selectedDate]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCitySelect = (city) => {
        if (city) {
            setSelectedCity(city);
        } else {
            setSelectedCity({ city: 'No data available', summary: 'No data available' });
        }
    };

    return (
        <div className='flex'>
            <div className='w-1/2'>
                {citiesData.map((city, index) => (
                    <CityCharge
                        key={index}
                        cityName={city.city}
                        temperature={Math.round(city.avg_temp)}
                        weatherType={city.predominant_condition}
                        onSelect={() => handleCitySelect(city)}
                    />
                ))}
            </div>
            <div className='w-2/5'>
                <div className='flex justify-center text-black'>
                    <DatePicker selected={selectedDate} onChange={handleDateChange} />
                </div>
                {selectedCity && selectedCity.city === 'No data available' ? (
                    <div className='text-red-500 text-2xl text-center mt-4'>No data available</div>
                ) : (
                    selectedCity && <SelectedCity weatherData={selectedCity} />
                )}
            </div>
        </div>
    );
}
