import {useEffect, useState} from "react";
import {getWeather} from "../services/weatherService";
import type {WeatherData} from "../types/weather";///remove type???

import PixelDisplay from "./PixelDisplay";
//time logic of app

interface ClockProps{
    label: string;
    timeZone: string;
    city: string;
}

function Clock({label, timeZone, city}: ClockProps){
    const [time, setTime] = useState(""); //react state, time holds formatted string, settime updates and triggers rerender
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        const updateTime = () => { //date() gets current time
            const formatted = new Date().toLocaleTimeString("en-US", {
                timeZone,//update to other timezone
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });//no api browser native
            setTime(formatted);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000); //update clock every second rerender the changes
        return () => clearInterval(interval);
    }, [timeZone]);

    useEffect(() => {
        getWeather(city)
        .then(setWeather)
        .catch(console.error);
    }, [city]);

    return(
        <div style={{marginBottom: "2rem"}}>
            <h2>{label}</h2>
            <p style={{fontSize: "1.5rem"}}>{time}</p>

            {weather &&(
                <>
                    <p>
                        {Math.round(weather.main.temp)}°C -{" "}
                        {weather.weather[0].main}
                    </p>
                    <PixelDisplay condition={weather.weather[0].main} />
                </>
            )}
        </div>
    );
}

export default Clock;