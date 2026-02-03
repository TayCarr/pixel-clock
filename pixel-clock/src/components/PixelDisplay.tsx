import { useMemo } from "react";
import '../style/pixel.css'

import spring from '../assets/flowers/daisy.PNG';
import summer from '../assets/flowers/poppy.PNG';
import fall from '../assets/flowers/iris.PNG';
import winter from '../assets/flowers/snowdrop.PNG';

//TODO weather animation imports

const flowerSeason = {
    spring,
    summer,
    fall,
    winter,
} as const;

//TODO for weather overlay, from openweathermap
const weatherOverlay = {
    Clear: undefined,
    Rain: undefined,
    Snow: undefined,
    Clouds: undefined
}as const;

interface PixelDisplayProps{
    condition: string; //rainy snowing etc var
    isDay: boolean; //AM/PM switch
    date?: Date;
}


function getSeason(date: Date): "spring" | "summer" | "fall" | "winter" {
    const month = date.getMonth(); //0-11 
    if (month < 2 || month === 11) return "winter";
    if (month < 5) return "spring";
    if (month < 8) return "summer";
    return "fall";
}

function PixelDisplay({condition, isDay, date = new Date()}: PixelDisplayProps){
    
    const season = useMemo(() => getSeason(date), [date]);

    const flower = flowerSeason[season];
    const overlay = weatherOverlay[condition as keyof typeof weatherOverlay];
    
    return(
        <div className={`scene ${isDay ? "" : "night"}`}>
            <img src={flower} className="pixel-sprite"/>

            {overlay && (
                <img src={overlay} className="pixel-sprite overlay"/>
            )}

        </div>
    );
}

export default PixelDisplay;