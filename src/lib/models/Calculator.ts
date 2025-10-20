export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export interface CalculatorState {
  currentValue: number;
  previousValue: number | null;
  operation: Operation | null;
  displayValue: string;
  shouldResetDisplay: boolean;
}

export class Calculator {
  /**
   * Add two numbers
   * @param a - First number
   * @param b - Second number
   * @returns Sum of a and b
   */
  add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Subtract b from a
   * @param a - First number
   * @param b - Second number
   * @returns Difference of a and b
   */
  subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiply two numbers
   * @param a - First number
   * @param b - Second number
   * @returns Product of a and b
   */
  multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divide a by b
   * @param a - Numerator
   * @param b - Denominator
   * @returns Quotient of a and b
   * @throws Error if b is zero
   */
  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }

  /**
   * Execute an operation
   * @param operation - The operation to perform
   * @param a - First number
   * @param b - Second number
   * @returns Result of the operation
   */
  calculate(operation: Operation, a: number, b: number): number {
    switch (operation) {
      case 'add':
        return this.add(a, b);
      case 'subtract':
        return this.subtract(a, b);
      case 'multiply':
        return this.multiply(a, b);
      case 'divide':
        return this.divide(a, b);
    }
  }
}
