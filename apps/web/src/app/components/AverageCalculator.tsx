'use client';

import { useState } from 'react';
import { calculateAverage } from 'core';

interface AverageCalculatorProps {
  onHistoryAdd: (entry: any) => void;
  onResultChange: (result: string) => void;
}

export default function AverageCalculator({ onHistoryAdd, onResultChange }: AverageCalculatorProps) {
  const [numbers, setNumbers] = useState<{ id: number; value: number }[]>([]);
  const [newNumber, setNewNumber] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const addNumber = () => {
    const num = parseFloat(newNumber);
    if (!isNaN(num)) {
      setNumbers([...numbers, { id: Date.now(), value: num }]);
      setNewNumber('');
    }
  };

  const startEditing = (id: number, currentValue: number) => {
    setEditingId(id);
    setEditValue(currentValue.toString());
  };

  const saveEdit = (id: number) => {
    const num = parseFloat(editValue);
    if (!isNaN(num)) {
      setNumbers(numbers.map(item => 
        item.id === id ? { ...item, value: num } : item
      ));
    }
    setEditingId(null);
    setEditValue('');
  };

  const deleteNumber = (id: number) => {
    setNumbers(numbers.filter(item => item.id !== id));
  };

  const calculateAvg = () => {
    if (numbers.length === 0) return;
    const values = numbers.map(n => n.value);
    const res = calculateAverage(values);
    
    const resultText = `Average: ${res.average} (${res.count} numbers)`;
    onResultChange(resultText);
    
    onHistoryAdd({ 
      type: 'average', 
      result: res.average, 
      count: res.count 
    });
  };

  const clearNumbers = () => {
    setNumbers([]);
    onResultChange('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Average Calculator</h2>

      <div className="flex gap-3">
        <input
          type="number"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          placeholder="Enter number"
          className="flex-1 bg-gray-800 p-4 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={addNumber} className="bg-green-600 px-8 rounded-2xl font-medium hover:bg-green-700">
          Add
        </button>
      </div>

      <div className="text-center text-lg text-gray-400">
        {numbers.length} number{numbers.length !== 1 ? 's' : ''} added
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 min-h-[320px]">
        {numbers.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No numbers added yet</p>
        ) : (
          <ul className="space-y-3">
            {numbers.map((item) => (
              <li key={item.id} className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl group">
                {editingId === item.id ? (
                  <>
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit(item.id)}
                      className="flex-1 bg-gray-700 p-4 rounded-lg text-lg"
                      autoFocus
                    />
                    <button 
                      onClick={() => saveEdit(item.id)}
                      className="bg-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-xl font-medium">{item.value}</span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => startEditing(item.id, item.value)} className="text-blue-400 hover:text-blue-300 px-4 py-2">Edit</button>
                      <button onClick={() => deleteNumber(item.id)} className="text-red-400 hover:text-red-300 px-4 py-2">Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-4">
        <button onClick={calculateAvg} className="flex-1 bg-blue-600 py-4 rounded-2xl text-lg font-medium hover:bg-blue-700">
          Calculate Average
        </button>
        <button onClick={clearNumbers} className="flex-1 bg-red-600 py-4 rounded-2xl text-lg font-medium hover:bg-red-700">
          Clear All
        </button>
      </div>
    </div>
  );
}