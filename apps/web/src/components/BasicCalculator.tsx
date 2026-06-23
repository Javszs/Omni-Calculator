'use client';

import { useState } from 'react';
import { calculateExpression } from 'core';

interface BasicCalculatorProps {
  onHistoryAdd: (entry: any) => void;
}

export default function BasicCalculator({ onHistoryAdd }: BasicCalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [lastResult, setLastResult] = useState<string | null>(null);

  const isLastCharOperator = (str: string) => /[+\-*/]$/.test(str);

  const handleButton = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
      setExpression('');
      setLastResult(null);
      return;
    }

    if (value === '⌫') {
      if (expression.length <= 1) {
        setExpression('');
        setDisplay('0');
      } else {
        const newExpr = expression.slice(0, -1);
        setExpression(newExpr);
        setDisplay(newExpr || '0');
      }
      return;
    }

    if (value === '=') {
      if (!expression) return;
      const calcResult = calculateExpression(expression);
      const finalResult = calcResult.error ? 'Error' : calcResult.result.toString();

      setDisplay(finalResult);
      setExpression(finalResult);
      setLastResult(finalResult);

      if (!calcResult.error) {
        onHistoryAdd({ type: 'calc', expr: expression, result: finalResult });
      }
      return;
    }

    // Operator handling
    if (['+', '-', '*', '/'].includes(value)) {
      let current = expression || display;

      if (lastResult && !expression) {
        current = lastResult;
      }

      if (current === '0' && value === '-') {
        setExpression('-');
        setDisplay('-');
        return;
      }

      if (isLastCharOperator(current)) {
        const newExpr = current.slice(0, -1) + value;
        setExpression(newExpr);
        setDisplay(newExpr);
      } else {
        setExpression(current + value);
        setDisplay(current + value);
      }
      return;
    }

    // Number / Decimal handling
    let newDisplay = display;
    let newExpression = expression;

    if (value === '.') {
      const currentStr = expression || display;
      const lastPart = currentStr.split(/[+\-*/]/).pop() || '';
      if (lastPart.includes('.')) return; // prevent multiple decimals
    }

    // Prevent leading zeros
    if (value >= '0' && value <= '9') {
      const currentStr = expression || display;

      if (currentStr === '0' || currentStr === '-0') {
        newDisplay = value;
        newExpression = value;
      } else {
        newDisplay = currentStr + value;
        newExpression = currentStr + value;
      }
    } else {
      // For other inputs like decimal
      newDisplay = (expression || display) + value;
      newExpression = (expression || display) + value;
    }

    setDisplay(newDisplay);
    setExpression(newExpression);
    setLastResult(null);
  };

  return (
    <div>
      <div className="bg-black rounded-2xl p-8 mb-8 text-right">
        <div className="text-gray-400 text-sm h-6 break-all">{expression || ' '}</div>
        <div className="text-6xl font-light tracking-widest break-all">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 text-2xl">
        <button onClick={() => handleButton('C')} className="bg-red-500/80 hover:bg-red-600 py-6 rounded-2xl active:scale-95 transition font-medium">C</button>
        <button onClick={() => handleButton('(')} className="bg-gray-700 hover:bg-gray-600 py-6 rounded-2xl active:scale-95 transition">(</button>
        <button onClick={() => handleButton(')')} className="bg-gray-700 hover:bg-gray-600 py-6 rounded-2xl active:scale-95 transition">)</button>
        <button onClick={() => handleButton('⌫')} className="bg-gray-700 hover:bg-gray-600 py-6 rounded-2xl active:scale-95 transition font-medium text-xl">⌫</button>

        {[7,8,9,'/'].map(v => (
          <button key={v} onClick={() => handleButton(v.toString())} className="bg-gray-800 hover:bg-gray-700 py-6 rounded-2xl active:scale-95 transition">{v}</button>
        ))}
        {[4,5,6,'*'].map(v => (
          <button key={v} onClick={() => handleButton(v.toString())} className="bg-gray-800 hover:bg-gray-700 py-6 rounded-2xl active:scale-95 transition">{v}</button>
        ))}
        {[1,2,3,'-'].map(v => (
          <button key={v} onClick={() => handleButton(v.toString())} className="bg-gray-800 hover:bg-gray-700 py-6 rounded-2xl active:scale-95 transition">{v}</button>
        ))}
        {[0, '.', '+', '='].map(v => (
          <button 
            key={v} 
            onClick={() => handleButton(v.toString())}
            className={`py-6 rounded-2xl active:scale-95 transition font-medium 
              ${v === '=' ? 'bg-blue-600' : v === '0' ? 'col-span-2' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}