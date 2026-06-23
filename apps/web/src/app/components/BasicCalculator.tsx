'use client';

import { useState } from 'react';
import { calculateExpression } from 'core';

interface BasicCalculatorProps {
  onHistoryAdd: (entry: any) => void;
}

export default function BasicCalculator({ onHistoryAdd }: BasicCalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleButton = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
      setExpression('');
    } else if (value === '=') {
      const calcResult = calculateExpression(expression || display);
      const finalResult = calcResult.error ? 'Error' : calcResult.result.toString();
      
      setDisplay(finalResult);
      setExpression('');

      if (!calcResult.error) {
        onHistoryAdd({ 
          type: 'calc', 
          expr: expression || display, 
          result: finalResult 
        });
      }
    } else {
      setExpression(prev => prev + value);
      setDisplay(prev => prev === '0' ? value : prev + value);
    }
  };

  return (
    <div>
      <div className="bg-black rounded-2xl p-8 mb-8 text-right">
        <div className="text-gray-400 text-sm h-6">{expression}</div>
        <div className="text-6xl font-light tracking-widest break-all">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 text-2xl">
        {['C', '(', ')', '/'].map(v => (
          <button key={v} onClick={() => handleButton(v)} className="bg-gray-800 hover:bg-gray-700 py-6 rounded-2xl active:scale-95 transition">{v}</button>
        ))}
        {[7,8,9,'*'].map(v => (
          <button key={v} onClick={() => handleButton(v.toString())} className="bg-gray-800 hover:bg-gray-700 py-6 rounded-2xl active:scale-95 transition">{v}</button>
        ))}
        {[4,5,6,'-'].map(v => (
          <button key={v} onClick={() => handleButton(v.toString())} className="bg-gray-800 hover:bg-gray-700 py-6 rounded-2xl active:scale-95 transition">{v}</button>
        ))}
        {[1,2,3,'+'].map(v => (
          <button key={v} onClick={() => handleButton(v.toString())} className="bg-gray-800 hover:bg-gray-700 py-6 rounded-2xl active:scale-95 transition">{v}</button>
        ))}
        {[0, '.', '='].map(v => (
          <button 
            key={v} 
            onClick={() => handleButton(v.toString())}
            className={`py-6 rounded-2xl active:scale-95 transition font-medium ${v === '=' ? 'bg-blue-600 col-span-2' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}