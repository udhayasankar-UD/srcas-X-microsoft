import { useRef, useEffect } from 'react';

export default function PixelText({ text = "autonomous", levels = 6 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // We wait for the font to load so measurement and rendering are correct
    document.fonts.ready.then(() => {
      const scale = 16;     // pixel size
      const fontSize = 10;  // small font size for chunky pixels

      const smallCanvas = document.createElement("canvas");
      const sctx = smallCanvas.getContext("2d", { willReadFrequently: true });

      // Use the actual font
      const fontStr = `800 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
      sctx.font = fontStr;
      const metrics = sctx.measureText(text);

      smallCanvas.width = Math.ceil(metrics.width);
      // Adding a larger buffer to height to prevent clipping
      smallCanvas.height = fontSize + 4;

      sctx.font = fontStr;
      
      // Draw white background
      sctx.fillStyle = "white";
      sctx.fillRect(0, 0, smallCanvas.width, smallCanvas.height);
      
      // Draw black text
      sctx.fillStyle = "black";
      sctx.textBaseline = "middle";
      sctx.fillText(text, 0, smallCanvas.height / 2);

      // Quantize grayscale levels
      let imgData = sctx.getImageData(0, 0, smallCanvas.width, smallCanvas.height);
      let data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        let gray = data[i]; // red channel (since it's grayscale, r=g=b)

        // quantize
        let step = 255 / (levels - 1);
        let quantized = Math.round(gray / step) * step;

        // We want transparent background instead of white.
        // White (quantized == 255) becomes transparent.
        // Black/gray becomes #111 (17, 17, 17) with alpha mapped from darkness.
        data[i] = 17;     // r
        data[i+1] = 17;   // g
        data[i+2] = 17;   // b
        data[i+3] = 255 - quantized; // alpha
      }

      sctx.putImageData(imgData, 0, 0);

      // Main canvas
      const ctx = canvas.getContext("2d");
      canvas.width = smallCanvas.width * scale;
      canvas.height = smallCanvas.height * scale;

      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(smallCanvas, 0, 0, canvas.width, canvas.height);
    });
  }, [text, levels]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        imageRendering: 'pixelated',
        height: '0.9em', // Scales properly with the surrounding text
        verticalAlign: 'middle', // Align better with the line
        display: 'inline-block',
        margin: '0 0.1em'
      }} 
      aria-label={text}
    />
  );
}
