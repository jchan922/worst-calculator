import { writable } from 'svelte/store';
import { Calculator, type CalculatorState, type Operation } from '$lib/models/Calculator';

/**
 * Route-specific calculator store
 * This instance is isolated to the /calculator route
 */
class RouteCalculatorStore {
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

  handleOperationInput(operation: Operation): void {
    this.state.update(s => {
      let newValue = s.currentValue;

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

  handleClear(): void {
    this.state.update(s => ({
      ...s,
      currentValue: 0,
      displayValue: '0',
      shouldResetDisplay: false
    }));
  }

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

// Export a new instance for this route
export const routeCalculatorStore = new RouteCalculatorStore();
