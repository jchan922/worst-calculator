import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator, type Operation } from './Calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add()', () => {
    [
      { title: 'should add two positive numbers', a: 2, b: 3, expected: 5 },
      { title: 'should add positive and negative numbers', a: 5, b: -3, expected: 2 },
      { title: 'should add two negative numbers', a: -2, b: -3, expected: -5 },
      { title: 'should add zero to a number', a: 5, b: 0, expected: 5 },
      { title: 'should handle very large numbers', a: 1e10, b: 1e10, expected: 2e10 }
    ].forEach(({ title, a, b, expected }) => {
      it(title, () => {
        expect(calculator.add(a, b)).toBe(expected);
      });
    });

    it('should handle decimal numbers', () => {
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });
  });

  describe('subtract()', () => {
    [
      { title: 'should subtract two positive numbers', a: 5, b: 3, expected: 2 },
      { title: 'should subtract a larger number from a smaller number', a: 3, b: 5, expected: -2 },
      { title: 'should subtract negative numbers', a: 5, b: -3, expected: 8 },
      { title: 'should subtract zero', a: 5, b: 0, expected: 5 },
      { title: 'should handle very large numbers', a: 1e10, b: 1e9, expected: 9e9 }
    ].forEach(({ title, a, b, expected }) => {
      it(title, () => {
        expect(calculator.subtract(a, b)).toBe(expected);
      });
    });

    it('should handle decimal numbers', () => {
      expect(calculator.subtract(0.3, 0.1)).toBeCloseTo(0.2);
    });
  });

  describe('multiply()', () => {
    [
      { title: 'should multiply two positive numbers', a: 3, b: 4, expected: 12 },
      { title: 'should multiply by zero', a: 5, b: 0, expected: 0 },
      { title: 'should multiply positive and negative numbers', a: 5, b: -3, expected: -15 },
      { title: 'should multiply two negative numbers', a: -3, b: -4, expected: 12 }
    ].forEach(({ title, a, b, expected }) => {
      it(title, () => {
        expect(calculator.multiply(a, b)).toBe(expected);
      });
    });

    it('should handle decimal numbers', () => {
      expect(calculator.multiply(0.2, 0.5)).toBeCloseTo(0.1);
    });

    it('should handle very small numbers', () => {
      expect(calculator.multiply(0.000001, 0.000001)).toBeCloseTo(0.000000000001);
    });
  });

  describe('divide()', () => {
    [
      { title: 'should divide two positive numbers', a: 10, b: 2, expected: 5 },
      { title: 'should divide positive and negative numbers', a: 10, b: -2, expected: -5 },
      { title: 'should divide two negative numbers', a: -10, b: -2, expected: 5 }
    ].forEach(({ title, a, b, expected }) => {
      it(title, () => {
        expect(calculator.divide(a, b)).toBe(expected);
      });
    });

    it('should handle decimal results', () => {
      expect(calculator.divide(1, 3)).toBeCloseTo(0.333, 2);
    });

    [
      { title: 'should throw error when dividing by zero', a: 5, b: 0 },
      { title: 'should throw error when dividing zero by zero', a: 0, b: 0 }
    ].forEach(({ title, a, b }) => {
      it(title, () => {
        expect(() => calculator.divide(a, b)).toThrow('Division by zero');
      });
    });

    it('should handle very small divisors', () => {
      expect(calculator.divide(1, 0.0000000001)).toBeGreaterThan(1e9);
    });
  });

  describe('calculate()', () => {
    [
      { title: 'should perform addition when operation is "add"', operation: 'add' as Operation, a: 5, b: 3, expected: 8 },
      { title: 'should perform subtraction when operation is "subtract"', operation: 'subtract' as Operation, a: 5, b: 3, expected: 2 },
      { title: 'should perform multiplication when operation is "multiply"', operation: 'multiply' as Operation, a: 5, b: 3, expected: 15 },
      { title: 'should perform division when operation is "divide"', operation: 'divide' as Operation, a: 10, b: 2, expected: 5 }
    ].forEach(({ title, operation, a, b, expected }) => {
      it(title, () => {
        expect(calculator.calculate(operation, a, b)).toBe(expected);
      });
    });

    it('should throw error for division by zero', () => {
      expect(() => calculator.calculate('divide', 5, 0)).toThrow('Division by zero');
    });

    it('should handle decimal results', () => {
      expect(calculator.calculate('add', 0.1, 0.2)).toBeCloseTo(0.3);
    });
  });
});
