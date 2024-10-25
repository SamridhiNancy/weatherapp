import React, { useState } from 'react';
import { GiSunbeams } from "react-icons/gi";
import { TiWeatherShower } from "react-icons/ti";
import { BiBuildings } from "react-icons/bi";
import Navbar from './Weather';
import Weather from './Weather';
import Cities from './Cities';
import Settings from './Settings';

function Citie() {
    return <div className='text-white'>
        <Cities />
    </div>;
}

function Map() {
    return <div className='text-white'>Map Component</div>;
}

function Setting() {
    return <div className='text-white'>
        <Settings />
    </div>;
}

function Sidebar() {
    const [selected, setSelected] = useState('weather');
    const renderContent = () => {
        switch (selected) {
            case 'weather':
                return <Weather />;
            case 'citie':
                return <Citie />;
            case 'settings':
                return <Setting />;
            default:
                return null;
        }
    }
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <div className='w-[10%] bg-slate-700 h-[90%] flex-col pt-12 justify-center rounded-lg'>
                <div className=' w-full flex justify-center rounded-lg'>
                    <GiSunbeams className='text-6xl text-yellow-400' />
                </div>

                <div
                    className={`w-full pt-8 flex flex-col items-center justify-center text-center rounded-lg cursor-pointer opacity-60 ${selected === 'weather' && 'opacity-100'}`}
                    onClick={() => setSelected('weather')}
                >
                    <TiWeatherShower className='text-3xl text-yellow-400' />
                    <p className='text-white text-xl'>Weather</p>
                </div>
                <div
                    className={`w-full pt-8 flex flex-col items-center justify-center text-center rounded-lg cursor-pointer opacity-60 ${selected === 'cities' && 'opacity-100'}`}
                    onClick={() => setSelected('citie')}
                >
                    <BiBuildings className='text-3xl text-yellow-400' />
                    <p className='text-white text-xl'>Cities</p>
                </div>
                <div
                    className={`w-full pt-8 flex flex-col items-center justify-center text-center rounded-lg cursor-pointer opacity-60 ${selected === 'settings' && 'opacity-100'}`}
                    onClick={() => setSelected('settings')}
                >
                    <TiWeatherShower className='text-3xl text-yellow-400' />
                    <p className='text-white text-xl'>Settings</p>
                </div>
            </div>
            <div className='w-[80%] h-[90%] p-8 bg-slate-900 rounded-lg ml-4'>
                {renderContent()}
            </div>
        </div>
    );
}

export default Sidebar;
