'use client';

import { useState } from 'react';
import BasicCalculator from '../components/BasicCalculator';
import AverageCalculator from '../components/AverageCalculator';
import UnitConverter from '../components/UnitConverter';

type Mode = 'calculator' | 'average' | 'converter';

export default function CalculatorApp() {
  const [mode, setMode] = useState<Mode>('calculator');
  const [history, setHistory] = useState<any[]>([]);
  const [currentResult, setCurrentResult] = useState('');

  const addToHistory = (entry: any) => {
    setHistory(prev => [entry, ...prev].slice(0, 10));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-12">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-5xl font-bold text-center mb-10 text-blue-400">Omni-Calculator</h1>

        {/* Mode Tabs */}
        <div className="flex gap-2 mb-8 bg-gray-900 p-1 rounded-2xl">
          {(['calculator', 'average', 'converter'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-4 rounded-xl font-medium transition-all ${
                mode === m ? 'bg-blue-600 shadow-lg' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {m === 'calculator' ? 'Calculator' : m === 'average' ? 'Average' : 'Converter'}
            </button>
          ))}
        </div>

        <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl min-h-[500px]">
          {mode === 'calculator' && <BasicCalculator onHistoryAdd={addToHistory} />}
          {mode === 'average' && <AverageCalculator onHistoryAdd={addToHistory} onResultChange={setCurrentResult} />}
          {mode === 'converter' && <UnitConverter onHistoryAdd={addToHistory} onResultChange={setCurrentResult} />}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg mb-4 text-gray-400">Recent History</h3>
            <div className="bg-gray-900 rounded-2xl p-5 space-y-3 text-sm">
              {history.map((item, i) => (
                <div key={i} className="py-2 border-b border-gray-700 last:border-0">
                  {item.type === 'calc' && `${item.expr} = ${item.result}`}
                  {item.type === 'average' && `Average of ${item.count} numbers = ${item.result}`}
                  {item.type === 'conversion' && `${item.from} → ${item.to}`}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}