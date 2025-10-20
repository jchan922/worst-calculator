import { writable } from 'svelte/store';
import { Calculator, type CalculatorState, type Operation } from '$lib/models/Calculator';

/**
 * Calculator Store - Client-side state manager
 * Manages calculator state and user interactions
 */
class CalculatorStore {
  private calculator: Calculator;

  public state = writable<CalculatorState>({
    currentValue: 0,
    previousValue: null,
    operation: null,
    displayValue: '0',
    shouldResetDisplay: false
  });

  constructor() {
    this.calculator = new Calculator();
  }

  /**
   * Handle number input
   * @param digit - The digit pressed (0-9)
   */
  handleNumberInput(digit: string): void {
    this.state.update(s => {
      let newDisplay = s.displayValue;

      if (s.shouldResetDisplay || s.displayValue === '0') {
        newDisplay = digit;
      } else {
        newDisplay = s.displayValue + digit;
      }

      return {
        ...s,
        displayValue: newDisplay,
        currentValue: parseFloat(newDisplay),
        shouldResetDisplay: false
      };
    });
  }

  /**
   * Handle decimal point input
   */
  handleDecimal(): void {
    this.state.update(s => {
      if (s.shouldResetDisplay) {
        return {
          ...s,
          displayValue: '0.',
          shouldResetDisplay: false
        };
      }

      if (s.displayValue.includes('.')) {
        return s;
      }

      return {
        ...s,
        displayValue: s.displayValue + '.'
      };
    });
  }

  /**
   * Handle operation input
   * @param operation - The operation to perform
   */
  handleOperationInput(operation: Operation): void {
    this.state.update(s => {
      let newValue = s.currentValue;

      // If there's a pending operation, calculate it first
      if (s.previousValue !== null && s.operation !== null && !s.shouldResetDisplay) {
        try {
          newValue = this.calculator.calculate(s.operation, s.previousValue, s.currentValue);
        } catch (error) {
          return {
            ...s,
            displayValue: 'Error',
            currentValue: 0,
            previousValue: null,
            operation: null,
            shouldResetDisplay: true
          };
        }
      }

      return {
        ...s,
        previousValue: newValue,
        operation,
        currentValue: newValue,
        displayValue: String(newValue),
        shouldResetDisplay: true
      };
    });
  }

  /**
   * Handle equals button
   */
  handleEquals(): void {
    this.state.update(s => {
      if (s.previousValue === null || s.operation === null) {
        return s;
      }

      try {
        const result = this.calculator.calculate(s.operation, s.previousValue, s.currentValue);

        return {
          currentValue: result,
          previousValue: null,
          operation: null,
          displayValue: String(result),
          shouldResetDisplay: true
        };
      } catch (error) {
        return {
          currentValue: 0,
          previousValue: null,
          operation: null,
          displayValue: 'Error',
          shouldResetDisplay: true
        };
      }
    });
  }

  /**
   * Clear current entry
   */
  handleClear(): void {
    this.state.update(s => ({
      ...s,
      currentValue: 0,
      displayValue: '0',
      shouldResetDisplay: false
    }));
  }

  /**
   * Clear all (reset calculator)
   */
  handleAllClear(): void {
    this.state.set({
      currentValue: 0,
      previousValue: null,
      operation: null,
      displayValue: '0',
      shouldResetDisplay: false
    });
  }
}

export const calculatorStore = new CalculatorStore();
