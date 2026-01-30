import {useEffect, useState} from "react";
import {getWeather} from "../services/weatherService";
import type {WeatherData} from "../types/weather";///remove type???

interface ClockProps{
    label: string;
    timeZone: string;
    city: string;
}

function Clock({label, timeZone, city}: ClockProps){
    const [time, setTime] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        const updateTime = () => {
            const formatted = new Date().toLocaleTimeString("en-US", {
                timeZone,
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setTime(formatted);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
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
                <p>
                    {Math.round(weather.main.temp)}°C -{" "}
                    {weather.weather[0].main}
                </p>
            )}
        </div>
    );
}

export default Clock;