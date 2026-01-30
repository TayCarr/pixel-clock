import type { WeatherData } from "../types/weather";//remove type at import??? 

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
//weather api logic
export async function getWeather(city: string): Promise<WeatherData>{//async function return a prmise
    const res = await fetch(
        //http request returns json weather data
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if(!res.ok){
        throw new Error("Failed to fetch weather");
    }
    //convert response to JS object, typed as WeatherData via typescript
    return res.json();
}
