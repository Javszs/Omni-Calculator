'use client';

import { useState } from 'react';
import BasicCalculator from '../components/BasicCalculator';
import AverageCalculator from '../components/AverageCalculator';
import UnitConverter from '../components/UnitConverter';

type Mode = 'calculator' | 'average' | 'converter';

const modeLabels = {
  calculator: 'Common Calculator',
  average: 'Average Calculator',
  converter: 'Unit Converter'
};

export default function CalculatorApp() {
  const [mode, setMode] = useState<Mode>('calculator');
  const [history, setHistory] = useState<any[]>([]);
  const [currentResult, setCurrentResult] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const addToHistory = (entry: any) => {
    setHistory(prev => [entry, ...prev].slice(0, 10));
  };

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-12">
      <div className="max-w-4xl mx-auto p-6">
        
        {/* Top Bar */}
        <div className="flex items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400">Omni-Calculator</h1>
        </div>

        {/* Current Tool Display */}
        <div className="grid grid-flow-col grid-rows-1 gap-5 mb-8 text-center">
          <div className="col-span-14 inline-block bg-gray-900 text-white px-8 py-3 rounded-2xl text-xl font-semibold shadow-inner">
            {modeLabels[mode]}
          </div>
          {/* Burger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="col-span-1 p-3 rounded-2xl hover:bg-gray-800 transition items-center justify-center flex bg-gray-900 shadow-inner"
          >
            <div className="space-y-1.5">
              <div className="w-7 h-0.5 bg-white rounded"></div>
              <div className="w-7 h-0.5 bg-white rounded"></div>
              <div className="w-7 h-0.5 bg-white rounded"></div>
            </div>
          </button>
        </div>

        {/* Burger Menu */}
        {menuOpen && (
          <div className="absolute right-30 top-38 bg-gray-900 rounded-2xl shadow-2xl py-2 w-55 border border-gray-700 z-50 overflow-hidden">
            {(['calculator', 'average', 'converter'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => changeMode(m)}
                className={`w-full text-left px-6 py-4 hover:bg-gray-800 scale-90 rounded-2xl transition flex items-center justify-between text-lg ${
                  mode === m 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {modeLabels[m]}
              </button>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl min-h-[520px]">
          {mode === 'calculator' && <BasicCalculator onHistoryAdd={addToHistory} />}
          {mode === 'average' && <AverageCalculator onHistoryAdd={addToHistory} onResultChange={setCurrentResult} />}
          {mode === 'converter' && <UnitConverter onHistoryAdd={addToHistory} onResultChange={setCurrentResult} />}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-10">
            <h3 className="text-lg mb-4 text-gray-400">Recent History</h3>
            <div className="bg-gray-900 rounded-2xl p-5 max-h-60 overflow-y-auto custom-scrollbar">
              {history.map((item, i) => (
                <div key={i} className="py-3 border-b border-gray-700 last:border-0 text-sm">
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