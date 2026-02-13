import { useMemo } from "react";
import '../style/pixel.css'

import spring from '../assets/flowers/daisy.PNG';
import summer from '../assets/flowers/poppy.PNG';
import fall from '../assets/flowers/iris.PNG';
import winter from '../assets/flowers/snowdrop.PNG';

import windowPixel from '../assets/window.png'

import Clear from '../assets/conditions/sun.gif'
import Clouds from '../assets/conditions/clouds.gif'
import Rain from '../assets/conditions/Raintest1.gif'
import Drizzle from '../assets/conditions/Raintest1.gif'
import Thunderstorm from '../assets/conditions/Thundertest.gif'
import Snow from '../assets/conditions/Snow.gif'
import Mist from '../assets/conditions/Mist.gif'


//TODO weather animation imports
const weatherCondition = {
    Clouds,
    Clear,
    Rain,
    Drizzle,
    Thunderstorm,
    Snow,
    Mist,
} as const;

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
    //for testing
    //console.log(month);
    //if (month === 1) return "winter";
    //if (month === 1) return "spring";
    //if (month === 1) return "summer";
    //if (month === 1) return "fall";

    if (month < 2 || month === 11) return "winter";
    if (month < 5) return "spring";
    if (month < 8) return "summer";
    return "fall";
}

function PixelDisplay({condition, isDay, date = new Date()}: PixelDisplayProps){
    
    const season = useMemo(() => getSeason(date), [date]);

    const flower = flowerSeason[season];
    //console.log(season);
    const overlay = weatherOverlay[condition as keyof typeof weatherOverlay];
    console.log(condition);
    const displayCondition = weatherCondition[condition];
    
    return(
        <div>
        <div className="window-scene-container">
        <img src={windowPixel} className="pixel-window"/>
        {/*<img src={displayCondition} className="pixel-condition"/>
        <img src={Rain} className="pixel-condition"/>
        */}
        <img src={displayCondition} className="pixel-condition"/>
        <img src={flower} className="pixel-sprite"/>
        </div>

        <div className={`scene ${isDay ? "" : "night"}`}>
            
            

            {overlay && (
                <img src={overlay} className="pixel-sprite overlay"/>
            )}

        
        </div>
        </div>
    );
}

export default PixelDisplay;