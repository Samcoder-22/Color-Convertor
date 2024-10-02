import React, { useState, useEffect, useRef } from 'react';
import { rgbToHex, hexToRgb, rgbToHsl, hslToRgb, hexToHsl, hslToHex } from './ConversionFunctions';
import ColorDisplay from './ColorDisplay';  

const ColorConvertor = () => {
    
    const [hex, setHex] = useState('FFFFFF'); 
    const [rgb, setRgb] = useState([255, 255, 255]); 
    const [hsl, setHsl] = useState([0, 0, 100]); 

    const sourceRef = useRef(null);

    useEffect(() => {
        switch (sourceRef.current) {
          case 'hex':
            try {
              const rgbValues = hexToRgb(hex);
              const hslValues = hexToHsl(hex);
              setRgb(rgbValues);
              setHsl(hslValues);
            } catch (error) {
              console.error('Invalid HEX format');
            }
            break;
          case 'rgb':
            try {
              const hexValue = rgbToHex(rgb[0], rgb[1], rgb[2]);
              const hslValues = rgbToHsl(rgb[0], rgb[1], rgb[2]);
              setHex(hexValue);
              setHsl(hslValues);
            } catch (error) {
              console.error('Invalid RGB values');
            }
            break;
          case 'hsl':
            try {
              const rgbValues = hslToRgb(hsl[0], hsl[1], hsl[2]);
              const hexValue = hslToHex(hsl[0], hsl[1], hsl[2]);
              setRgb(rgbValues);
              setHex(hexValue);
            } catch (error) {
              console.error('Invalid HSL values');
            }
            break;
          default:
            console.error('Invalid source');
            break;
        }
      }, [hex, rgb, hsl, sourceRef]);

    const handleHexChange = (e) => {
        sourceRef.current = 'hex';  
        setHex(e.target.value.toUpperCase());
    };

    const handleRgbChange = (index, value) => {
        sourceRef.current = 'rgb';  
        const newRgb = [...rgb];
        newRgb[index] = Number(value);
        setRgb(newRgb);
    };

    const handleHslChange = (index, value) => {
        sourceRef.current = 'hsl';  
        const newHsl = [...hsl];
        newHsl[index] = Number(value);
        setHsl(newHsl);
    };

    return (
      <div className="color-convertor-container">
      <h1 id="color-heading">Color Converter</h1>
      <div className="input-group">
          <label>Hex: #</label>
          <input type="text" value={hex} onChange={handleHexChange} maxLength={6} />
      </div>
      <div className="input-group">
          <label>RGB:</label>
          <input type="number" value={rgb[0]} onChange={(e) => handleRgbChange(0, e.target.value)} min={0} max={255} />
          <input type="number" value={rgb[1]} onChange={(e) => handleRgbChange(1, e.target.value)} min={0} max={255} />
          <input type="number" value={rgb[2]} onChange={(e) => handleRgbChange(2, e.target.value)} min={0} max={255} />
      </div>
      <div className="input-group">
          <label>HSL:</label>
          <input type="number" value={hsl[0]} onChange={(e) => handleHslChange(0, e.target.value)} min={0} max={360} />
          <input type="number" value={hsl[1]} onChange={(e) => handleHslChange(1, e.target.value)} min={0} max={100} />
          <input type="number" value={hsl[2]} onChange={(e) => handleHslChange(2, e.target.value)} min={0} max={100} />
      </div>
      <ColorDisplay hex={hex} className="color-display" />
   </div>
   
    );
};

export default ColorConvertor;
