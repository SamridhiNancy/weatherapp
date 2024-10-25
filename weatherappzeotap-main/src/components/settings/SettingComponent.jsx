import React, { useState } from 'react';

export default function SettingComponent() {
    const [city, setCity] = useState('Delhi');
    const [tempType, setTempType] = useState('C');
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (!minTemp || !maxTemp || !email) {
            alert('Please fill in all fields.');
            return;
        }
        const data = {
            condition: "Rainy",
            city,
            tempUnit: tempType,
            minTemp,
            maxTemp,
            email,
        };
        const url = `http://localhost:4000/threshold`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                console.log('Response from server:', result);
                alert('Data submitted successfully!');
            })
            .catch(error => {
                console.error('Error during submission:', error);
                alert('There was an error submitting your data.');
            });

    };

    return (
        <div>
            <div className='flex flex-col items-start space-y-4'>
                <p className='text-2xl font-bold text-gray-400'>Set Thresholds for timely warnings:</p>
                <div className='flex-col items-center gap-y-4 pt-5 flex-wrap'>
                    <div className='flex items-center pt-4'>
                        <p className='text-xl font-semibold'>City Name:</p>
                        <select
                            className='border-2 rounded-lg px-4 py-2 text-black ml-2'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="Delhi">Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Hyderabad">Hyderabad</option>

                        </select>
                    </div>
                    <div className='flex items-center pt-4'>
                        <p className='text-xl font-semibold'>Temperature Unit:</p>
                        <select
                            className='border-2 rounded-lg px-4 py-2 text-black ml-2'
                            value={tempType}
                            onChange={(e) => setTempType(e.target.value)}
                        >
                            <option value="C">Celsius (°C)</option>
                            <option value="F">Fahrenheit (°F)</option>
                        </select>
                    </div>

                    <div className='flex items-center pt-4'>
                        <p className='text-xl font-semibold'>Minimum Temp:</p>
                        <input
                            type="number"
                            className='border-2 rounded-lg px-4 py-2 text-black ml-2 w-20'
                            placeholder="Min Temp"
                            value={minTemp}
                            onChange={(e) => setMinTemp(e.target.value)}
                        />
                    </div>

                    <div className='flex items-center pt-4'>
                        <p className='text-xl font-semibold'>Max Temperature:</p>
                        <input
                            type="number"
                            className='border-2 rounded-lg px-4 py-2 text-black ml-2 w-20'
                            placeholder="Max Temp"
                            value={maxTemp}
                            onChange={(e) => setMaxTemp(e.target.value)}
                        />
                    </div>

                    <div className='flex items-center pt-4'>
                        <p className='text-xl font-semibold'>Email to get alerts:</p>
                        <input
                            type="email"
                            className='border-2 rounded-lg px-4 py-2 text-black ml-2 w-40'
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='text-red-700'>
                    Note: Enter data in your preferred temperature type.
                </div>

                <div className='flex items-center justify-center pt-5'>
                    <button
                        className='bg-blue-700 px-6 py-3 text-2xl rounded-lg font-bold'
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
