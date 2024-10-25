import React from 'react'
import { WiStrongWind } from "react-icons/wi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { GoSun } from "react-icons/go";

export default function WeatherCard() {
    const temperature = 13;
    return (
        <div className=' w-[20%] m-5 bg-slate-700 rounded-lg'>
            <h1 className=' text-yellow-200 text-2xl font-bold py-4'>Today's Weather</h1>
            <div className='p-4'>
                <p className='text-4xl text-white'>{temperature}°C</p>
                <p className=' text-white'>Haze</p>
            </div>
            <div className=' text-white flex-col'>
                <div className=' flex items-center ml-8 gap-3'>
                    <WiStrongWind size={28} />
                    <p className=' text-xl'>20 km/h</p>
                </div>
                <div className=' flex items-center pt-2 ml-8 gap-3'>
                    <MdOutlineWaterDrop size={28} />
                    <p className=' text-xl'>84%</p>
                </div>
                <div className=' flex items-center pt-2 ml-8 gap-3'>
                    <GoSun size={28} />
                    <p className=' text-xl'> 0.2 h</p>
                </div>
            </div>
        </div>
    )
}
