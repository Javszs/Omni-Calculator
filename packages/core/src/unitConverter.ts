// Enhanced Unit Converter with multiple categories
export type UnitCategory = 
  | 'length' 
  | 'mass' 
  | 'temperature' 
  | 'volume' 
  | 'area' 
  | 'speed' 
  | 'time' 
  | 'digital';

export const unitConversions: Record<UnitCategory, Record<string, number>> = {
  length: {
    'mm': 0.001, 'cm': 0.01, 'm': 1, 'km': 1000,
    'inch': 0.0254, 'feet': 0.3048, 'yard': 0.9144, 'mile': 1609.34,
  },
  mass: {
    'mg': 0.000001, 'g': 0.001, 'kg': 1, 'ton': 1000,
    'oz': 0.0283495, 'lb': 0.453592
  },
  temperature: {
    'celsius': 1, 'fahrenheit': 1, 'kelvin': 1
  },
  volume: {
    'ml': 0.001, 'l': 1, 'm3': 1000,
    'gallon': 3.78541, 'cup': 0.236588, 'quart': 0.946353
  },
  area: {
    'm2': 1, 'km2': 1000000, 'cm2': 0.0001,
    'sqft': 0.092903, 'acre': 4046.86
  },
  speed: {
    'm/s': 1, 'km/h': 0.277778, 'mph': 0.44704,
    'knot': 0.514444, 'ft/s': 0.3048
  },
  time: {
    'second': 1, 'minute': 60, 'hour': 3600,
    'day': 86400, 'week': 604800, 'month': 2629800, 'year': 31557600
  },
  digital: {
    // Using decimal (SI) prefixes - most common for users
    'bit': 1, 'byte': 8,
    'kb': 8000, 'mb': 8000000, 'gb': 8e9, 'tb': 8e12,
  }
};

export function convertUnit(
  value: number,
  fromUnit: string,
  toUnit: string,
  category: UnitCategory
): number {
  if (category === 'temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }

  const conversions = unitConversions[category];
  const fromFactor = conversions[fromUnit.toLowerCase()];
  const toFactor = conversions[toUnit.toLowerCase()];

  if (fromFactor === undefined || toFactor === undefined) {
    throw new Error(`Invalid unit "${fromUnit}" or "${toUnit}" for ${category}`);
  }

  return (value * fromFactor) / toFactor;
}

function convertTemperature(value: number, from: string, to: string): number {
  let celsius: number;

  switch (from.toLowerCase()) {
    case 'celsius': celsius = value; break;
    case 'fahrenheit': celsius = (value - 32) * 5 / 9; break;
    case 'kelvin': celsius = value - 273.15; break;
    default: throw new Error("Invalid temperature from unit");
  }

  switch (to.toLowerCase()) {
    case 'celsius': return celsius;
    case 'fahrenheit': return celsius * 9 / 5 + 32;
    case 'kelvin': return celsius + 273.15;
    default: throw new Error("Invalid temperature to unit");
  }
}