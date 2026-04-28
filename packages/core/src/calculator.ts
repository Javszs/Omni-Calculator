// Basic & Scientific Calculator Engine

export interface CalculationResult {
  result: number;
  expression?: string;
  error?: string;
}

export function calculateExpression(expression: string): CalculationResult {
  try {
    // Basic safety: remove any dangerous characters
    const sanitized = expression.replace(/[^0-9+\-*/.()]/g, '');

    // Using Function constructor for simple math evaluation (safe enough for calculator)
    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${sanitized}`)();

    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error("Invalid calculation");
    }

    return {
      result: Number(result.toFixed(8)),
      expression: sanitized
    };
  } catch (err) {
    return {
      result: 0,
      error: "Invalid expression"
    };
  }
}

// Simple operations (useful for button-based calculator)
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

export function percentage(num: number): number {
  return num / 100;
}

// Scientific functions
export function square(num: number): number {
  return num * num;
}

export function squareRoot(num: number): number {
  if (num < 0) throw new Error("Cannot calculate square root of negative number");
  return Math.sqrt(num);
}

export function power(base: number, exponent: number): number {
  return Math.pow(base, exponent);
}