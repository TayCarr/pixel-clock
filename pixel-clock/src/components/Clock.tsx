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
    const [isDay, setIsDay] = useState(true);

    useEffect(() => {
        const updateTime = () => { //date() gets current time
            const now = new Date();

            const formatted = now.toLocaleTimeString("en-US", {
                timeZone,//update to other timezone
                hour: "numeric",
                minute: "2-digit",
                //second: "2-digit",
                hour12: true,
            });//no api browser native

            const hour24 = Number(
                now.toLocaleString("en-US", {
                    timeZone,
                    hour: "numeric",
                    hour12: false,
                })
            );
            
            setTime(formatted);
            setIsDay(hour24 >= 6 && hour24 < 18);
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
        <div style={{marginBottom: "7rem"}}>
            

            {weather &&(
                <>
                    <div className = 'scene-container'>
                    <PixelDisplay condition={weather.weather[0].main} isDay={isDay} />
                    <div className = 'text-container'>
                        <p className = 'city-text' style={{fontSize: "1rem"}}>{label}</p>
                        <p className = 'time-text' style={{fontSize: "1rem"}}>{time}</p>
                        <p className = 'weather-text'>
                            {Math.round(weather.main.temp)}°C -{" "}
                            {/* {weather.weather[0].main}-{" "}  condition returns: Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds */}
                            {weather.weather[0].description}
                            {/*{weather.weather[0].icon}*/}
                        </p>
                    </div>
                    </div>
                    
                </>
            )}
        </div>
    );
}

export default Clock;