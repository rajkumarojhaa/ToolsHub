import React, { useState } from 'react';

const ColorConverter = () => {
  const [color, setColor] = useState('#ffffff');
  const [rgb, setRgb] = useState('rgb(255, 255, 255)');
  const [hsl, setHsl] = useState('hsl(0, 0%, 100%)');
  const [hwb, setHwb] = useState('hwb(0, 0%, 100%)');
  const [cmyk, setCmyk] = useState('cmyk(0%, 0%, 0%, 0%)');
  const [lch, setLch] = useState('lch(100, 0, 0)');

  const handleColorChange = (e) => {
    const value = e.target.value;
    setColor(value);
    if (value) {
      const r = parseInt(value.slice(1, 3), 16);
      const g = parseInt(value.slice(3, 5), 16);
      const b = parseInt(value.slice(5, 7), 16);
      setRgb(hexToRgb(value));
      setHsl(rgbToHsl(r, g, b));
      setHwb(rgbToHwb(r, g, b));
      setCmyk(rgbToCmyk(r, g, b));
      setLch(rgbToLch(r, g, b));
    }
  };

  // HEX TO RGB
  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  // RGB TO HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  // RGB TO HWB
  const rgbToHwb = (r, g, b) => {
    const { h, s, l } = rgbToHsl(r, g, b);
    return `hwb(${Math.round(h)}, ${Math.round((1 - s) * 100)}%, ${Math.round((1 - l) * 100)}%)`;
  };

  // RGB TO CMYK
  const rgbToCmyk = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    let k = 1 - Math.max(r, g, b);
    let c = (1 - r - k) / (1 - k) || 0;
    let m = (1 - g - k) / (1 - k) || 0;
    let y = (1 - b - k) / (1 - k) || 0;
    return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
  };

  // RGB TO LCH
  const rgbToLab = (r, g, blue) => {
    // Convert RGB to XYZ
    r = r / 255; 
    g = g / 255; 
    blue = blue / 255;

    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    blue = blue > 0.04045 ? Math.pow((blue + 0.055) / 1.055, 2.4) : blue / 12.92;

    r *= 100; 
    g *= 100; 
    blue *= 100;

    let x = r * 0.4124564 + g * 0.3575761 + blue * 0.1804375;
    let y = r * 0.2126729 + g * 0.7151522 + blue * 0.0721750;
    let z = r * 0.0193339 + g * 0.1191920 + blue * 0.9503041;

    // Normalize XYZ
    x /= 95.047; 
    y /= 100.000; 
    z /= 108.883;

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : x * 7.787 + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : y * 7.787 + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : z * 7.787 + 16 / 116;

    let l = Math.max(0, 116 * y - 16);
    let a = Math.max(-128, (x - y) * 500);
    let bComponent = Math.max(-128, (y - z) * 200); // Renamed variable to bComponent

    return { l, a, b: bComponent };
  };

  const labToLch = (l, a, b) => {
    let c = Math.sqrt(a * a + b * b);
    let h = Math.atan2(b, a) * (180 / Math.PI);
    if (h < 0) h += 360;
    return { l, c, h };
  };

  const rgbToLch = (r, g, b) => {
    const { l, a, b: labB } = rgbToLab(r, g, b);
    const { l: lchL, c, h } = labToLch(l, a, labB);
    return `lch(${Math.round(lchL)}, ${Math.round(c)}, ${Math.round(h)}°)`;
  };

  return (
    <div className="flex flex-col items-center justify-center  p-4 bg-transparent">
      <h1 className="text-4xl font-bold text-center mb-2">Color Converter</h1>
      <p className="text-lg text-center mb-6">Convert colors between different formats, such as HEX, RGB, HSL, HWB, CMYK, and LCH.</p>
      
      <div className="flex items-center mb-6">
        <div
          className="w-12 h-12 border rounded mr-4"
          style={{ backgroundColor: color }}
        />
        <input
          type="text"
          value={color}
          onChange={handleColorChange}
          className="border border-white/30 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md text-black dark:text-white p-2 w-64 rounded"
          placeholder="#ffffff"
        />
      </div>
      
      <div className="p-4 border rounded-lg shadow-lg backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border-white/20 dark:border-gray-700/20 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Conversion</h2>
        <div className="space-y-4">
          <div>HEX: {color}</div>
          <div>RGB: {rgb}</div>
          <div>HSL: {hsl}</div>
          {/* <div>HWB: {hwb}</div> */}
          <div>CMYK: {cmyk}</div>
          <div>LCH: {lch}</div>
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;
