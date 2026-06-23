'use client';

import { useState, useEffect } from 'react';
import { convertUnit } from 'core';

const unitNames: Record<string, string> = { /* same as before */ };

interface UnitConverterProps {
  onHistoryAdd: (entry: any) => void;
  onResultChange: (result: string) => void;
}

export default function UnitConverter({ onHistoryAdd, onResultChange }: UnitConverterProps) {
  const [category, setCategory] = useState<'length' | 'mass' | 'temperature' | 'volume' | 'area' | 'speed' | 'time' | 'digital'>('length');
  const [fromValue, setFromValue] = useState<number>(100);
  const [fromUnit, setFromUnit] = useState('cm');
  const [toUnit, setToUnit] = useState('inch');
  const [conversionResult, setConversionResult] = useState('');

  const getUnits = (): string[] => {
    const unitsMap: Record<string, string[]> = {
      length: ['mm', 'cm', 'm', 'km', 'inch', 'feet', 'yard', 'mile'],
      mass: ['mg', 'g', 'kg', 'ton', 'oz', 'lb'],
      temperature: ['celsius', 'fahrenheit', 'kelvin'],
      volume: ['ml', 'l', 'm3', 'gallon', 'cup', 'quart'],
      area: ['m2', 'km2', 'cm2', 'sqft', 'acre'],
      speed: ['m/s', 'km/h', 'mph', 'knot'],
      time: ['second', 'minute', 'hour', 'day', 'week'],
      digital: ['bit', 'byte', 'kb', 'mb', 'gb', 'tb', 'kib', 'mib', 'gib']
    };
    return unitsMap[category] || [];
  };

  useEffect(() => {
    const units = getUnits();
    if (units.length > 0) {
      setFromUnit(units[0]);
      setToUnit(units.length > 1 ? units[1] : units[0]);
      setConversionResult('');
    }
  }, [category]);

  const handleConvert = () => {
    try {
      const result = convertUnit(fromValue, fromUnit, toUnit, category);
      const resultText = `${fromValue} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
      
      setConversionResult(resultText);
      onResultChange(resultText);

      onHistoryAdd({
        type: 'conversion',
        category,
        from: `${fromValue} ${fromUnit}`,
        to: `${result.toFixed(2)} ${toUnit}`
      });
    } catch (e: any) {
      const errorMsg = 'Error: ' + e.message;
      setConversionResult(errorMsg);
      onResultChange(errorMsg);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Unit Converter</h2>

      <div>
        <label className="block text-sm mb-2 text-gray-400">Category</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value as any)}
          className="w-full bg-gray-800 p-4 rounded-2xl text-lg"
        >
          <option value="length">Length / Distance</option>
          <option value="mass">Mass / Weight</option>
          <option value="temperature">Temperature</option>
          <option value="volume">Volume</option>
          <option value="area">Area</option>
          <option value="speed">Speed</option>
          <option value="time">Time</option>
          <option value="digital">Digital Storage</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm mb-2 text-gray-400">From</label>
          <input
            type="number"
            value={fromValue}
            onChange={(e) => setFromValue(parseFloat(e.target.value) || 0)}
            className="w-full bg-gray-800 p-5 rounded-2xl text-4xl font-light"
          />
          <select 
            value={fromUnit} 
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full mt-3 bg-gray-800 p-4 rounded-2xl text-base"
          >
            {getUnits().map(unit => (
              <option key={unit} value={unit}>
                {unit} ({unitNames[unit] || unit})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-400">To</label>
          <div className="bg-gray-800 p-5 rounded-2xl text-4xl font-light min-h-[78px] flex items-center">
            {conversionResult ? conversionResult.split('=')[1]?.trim() || '—' : '—'}
          </div>
          <select 
            value={toUnit} 
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full mt-3 bg-gray-800 p-4 rounded-2xl text-base"
          >
            {getUnits().map(unit => (
              <option key={unit} value={unit}>
                {unit} ({unitNames[unit] || unit})
              </option>
            ))}
          </select>
        </div>
      </div>

      <button 
        onClick={handleConvert}
        className="w-full bg-green-600 py-5 rounded-2xl text-xl font-semibold hover:bg-green-700 transition"
      >
        Convert
      </button>

      {conversionResult && !conversionResult.startsWith('Error') && (
        <div className="text-center text-3xl font-light py-6 bg-gray-800 rounded-2xl">
          {conversionResult}
        </div>
      )}
    </div>
  );
}