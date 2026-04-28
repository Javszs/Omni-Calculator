// Average Calculator Logic
export type AverageType = 'simple' | 'weighted';

export interface AverageResult {
  average: number;
  count: number;
  sum: number;
}

export function calculateAverage(numbers: number[], type: AverageType = 'simple'): AverageResult {
  if (numbers.length === 0) {
    return { average: 0, count: 0, sum: 0 };
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;

  return {
    average: Number(average.toFixed(4)),
    count: numbers.length,
    sum: Number(sum.toFixed(4))
  };
}

export function calculateWeightedAverage(values: number[], weights: number[]): AverageResult {
  if (values.length !== weights.length || values.length === 0) {
    throw new Error("Values and weights must have the same length");
  }

  const sum = values.reduce((acc, val, i) => acc + val * weights[i], 0);
  const weightSum = weights.reduce((acc, w) => acc + w, 0);

  const average = weightSum === 0 ? 0 : sum / weightSum;

  return {
    average: Number(average.toFixed(4)),
    count: values.length,
    sum: Number(sum.toFixed(4))
  };
}