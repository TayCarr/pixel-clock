import type { WeatherData } from "../types/weather";//remove type at import??? 

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(city: string): Promise<WeatherData>{
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if(!res.ok){
        throw new Error("Failed to fetch weather");
    }

    return res.json();
}
