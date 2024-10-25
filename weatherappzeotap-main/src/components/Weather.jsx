import React from 'react'
import TempNow from './weather/tempNow'
import HistoryForecast from './weather/HistoryForecast'
import TodayForecast from './weather/TodayForecast'

export default function Weather() {
    return (
        <div className="flex items-start space-x-4 px-4 py-4">
            <div className='w-[50%] flex-col'>

                <TempNow />
                <TodayForecast />
            </div>
            <div className=' w-[40%]'>

                <HistoryForecast />
            </div>
        </div>
    )
}
