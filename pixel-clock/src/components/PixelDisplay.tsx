import { useEffect, useRef } from "react";

interface PixelDisplayProps{
    condition: string;
}

function PixelDisplay({condition}: PixelDisplayProps){
    //stores a reference to a DOM element
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        //get drawing context, everything drawn goes through this object
        const ctx = canvas.getContext("2d");
        if(!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = condition === "Clear" ? "yellow" : "gray";
        ctx.fillRect(20, 20, 24, 24);//(x,y,width,height), draws a rectangle, canvas is a pixel grid
    }, [condition]);

    return <canvas ref={canvasRef} width={64} height={64} />;
}

export default PixelDisplay;