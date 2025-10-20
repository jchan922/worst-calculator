# Code Standards

## TypeScript Guidelines

### Type Definitions

- Always define interfaces for complex objects
- Use type for unions and primitives
- Export types from model files
- Use strict mode

### Naming Conventions

- **Interfaces**: PascalCase (e.g., `CalculatorState`)
- **Types**: PascalCase (e.g., `Operation`)
- **Classes**: PascalCase (e.g., `Calculator`)
- **Functions**: camelCase (e.g., `handleNumberInput`)
- **Variables**: camelCase (e.g., `currentValue`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_DISPLAY_LENGTH`)
- **Files**: PascalCase for classes/components, camelCase for utilities

---

## Styling Conventions

### SCSS Organization

#### Variables (`_variables.scss`)

```scss
// Colors
$primary-color: #4a90e2;
$secondary-color: #f39c12;
$background-color: #f5f5f5;
$text-color: #333;
$error-color: #e74c3c;

// Spacing
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;

// Typography
$font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-size-base: 16px;
$font-size-lg: 20px;
$font-size-xl: 32px;

// Breakpoints
$mobile: 480px;
$tablet: 768px;
$desktop: 1024px;
```

#### Fonts (`_fonts.scss`)

```scss
// Google Fonts or custom font imports
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

// Custom font-face definitions (if hosting fonts locally)
// @font-face {
//   font-family: 'CustomFont';
//   src: url('/fonts/CustomFont-Regular.woff2') format('woff2'),
//        url('/fonts/CustomFont-Regular.woff') format('woff');
//   font-weight: 400;
//   font-style: normal;
//   font-display: swap;
// }
```

#### Mixins (`_mixins.scss`)

```scss
@mixin button-base {
  padding: $spacing-md;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
}

@mixin responsive($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}
```

### Component Styling Pattern

Each component should use scoped styles:

```svelte
<script lang="ts">
  // Component logic
</script>

<div class="component-name">
  <!-- Component markup -->
</div>

<style lang="scss">
  @import '$lib/styles/variables';
  @import '$lib/styles/mixins';

  .component-name {
    // Component-specific styles
  }
</style>
```

---

## Testing Strategy

### Test Organization

**Convention**: Test files are siblings of the files they test

- Test files use the `.test.ts` or `.test.svelte` extension
- Place test files in the same directory as the code they test
- This keeps tests close to implementation for easier maintenance

**Example Structure**:
```
src/lib/models/
├── Calculator.ts
├── Calculator.test.ts
└── CalculatorState.ts

src/lib/components/
├── Calculator.svelte
├── Calculator.test.ts
├── Button.svelte
└── Button.test.ts
```

### Test Structure Patterns

#### One Describe Block Per Method

Each public method in a class should have its own `describe` block. This encapsulates all tests related to that method in one place, making tests easier to navigate and maintain.

**Example** from `src/lib/models/Calculator.test.ts`:

```typescript
describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add()', () => {
    // All add() tests here, including edge cases
  });

  describe('subtract()', () => {
    // All subtract() tests here, including edge cases
  });

  describe('multiply()', () => {
    // All multiply() tests here, including edge cases
  });

  describe('divide()', () => {
    // All divide() tests here, including edge cases
  });
});
```

#### Edge Cases Within Method Describes

Keep edge cases **within** their method's describe block rather than in a separate "Edge Cases" section. This maintains encapsulation and makes it clear which method is being tested.

**Good**:
```typescript
describe('divide()', () => {
  // Standard cases
  it('should divide two positive numbers', () => { ... });

  // Edge cases stay with the method
  it('should throw error when dividing by zero', () => { ... });
  it('should handle very small divisors', () => { ... });
});
```

**Avoid**:
```typescript
describe('divide()', () => {
  it('should divide two positive numbers', () => { ... });
});

describe('Edge Cases', () => {
  // ❌ Separated from the method - harder to maintain
  it('should throw error when dividing by zero', () => { ... });
});
```

#### Data-Driven Testing with Inline Arrays

Use inline arrays with `.forEach()` for testing multiple similar cases. This reduces duplication and makes it easy to add new test cases.

**Pattern**:
```typescript
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
});
```

**Benefits**:
- Clear test cases at a glance
- Easy to add new cases without code duplication
- Consistent test structure
- Self-documenting with descriptive titles

#### When to Keep Tests Separate

Not all tests should be data-driven. Keep tests separate when:

1. **Different assertion types are needed**:
```typescript
describe('add()', () => {
  // Data-driven for exact matches
  [
    { title: 'should add two positive numbers', a: 2, b: 3, expected: 5 },
    // ...
  ].forEach(({ title, a, b, expected }) => {
    it(title, () => {
      expect(calculator.add(a, b)).toBe(expected);
    });
  });

  // Separate test for floating-point precision
  it('should handle decimal numbers', () => {
    expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
  });
});
```

2. **Testing error conditions**:
```typescript
describe('divide()', () => {
  // Standard cases
  [
    { title: 'should divide two positive numbers', a: 10, b: 2, expected: 5 },
    // ...
  ].forEach(({ title, a, b, expected }) => {
    it(title, () => {
      expect(calculator.divide(a, b)).toBe(expected);
    });
  });

  // Error cases can also use data-driven approach
  [
    { title: 'should throw error when dividing by zero', a: 5, b: 0 },
    { title: 'should throw error when dividing zero by zero', a: 0, b: 0 }
  ].forEach(({ title, a, b }) => {
    it(title, () => {
      expect(() => calculator.divide(a, b)).toThrow('Division by zero');
    });
  });
});
```

#### Type Safety in Tests

When testing with type-specific parameters, use type assertions to maintain type safety:

```typescript
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
});
```

#### Test Setup with beforeEach

Use `beforeEach` to create fresh instances for each test, preventing test pollution:

```typescript
describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  // All tests use the fresh calculator instance
});
```

### Test Types

#### Unit Tests

**Location**: Next to the file being tested

**Target**: Models, utilities, and individual functions

**Reference Implementation**: `src/lib/models/Calculator.test.ts`

This file demonstrates all testing patterns:
- One describe per method (add, subtract, multiply, divide, calculate)
- Data-driven testing with inline arrays
- Edge cases within method describes
- Type-safe test data
- beforeEach setup
- 31 tests total, runs in ~3ms

#### Component Tests

**Location**: Next to the component file

**Target**: Component behavior and user interactions

**Example**:

```typescript
// src/lib/components/Calculator.test.ts
import { render, fireEvent } from '@testing-library/svelte';
import Calculator from './Calculator.svelte';

describe('Calculator Component', () => {
  it('should perform calculation when equals is clicked', async () => {
    const { getByText, getByTestId } = render(Calculator);

    await fireEvent.click(getByText('2'));
    await fireEvent.click(getByText('+'));
    await fireEvent.click(getByText('3'));
    await fireEvent.click(getByText('='));

    expect(getByTestId('display')).toHaveTextContent('5');
  });
});
```

---

## Error Handling

### Principles

- Fail gracefully with user-friendly messages
- Log errors for debugging
- Prevent application crashes
- Validate user input

### Implementation Patterns

#### Model Layer

```typescript
divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}
```

#### Controller Layer

```typescript
handleDivide(): void {
  try {
    const result = this.calculator.divide(a, b);
    this.state.update(s => ({ ...s, displayValue: String(result) }));
  } catch (error) {
    this.state.update(s => ({ ...s, displayValue: 'Error' }));
    console.error('Calculation error:', error);
  }
}
```

#### View Layer

```svelte
{#if errorMessage}
  <div class="error">{errorMessage}</div>
{/if}
```

---

## File Templates

### Model Template

```typescript
/**
 * Model description
 */
export interface ModelNameState {
  // State properties
}

export class ModelName {
  /**
   * Method description
   * @param param1 - Description
   * @returns Description
   */
  methodName(param1: Type): ReturnType {
    // Implementation
  }
}
```

### Component Template

```svelte
<script lang="ts">
  /**
   * Component description
   */

  // Props
  export let prop1: Type;

  // Local state

  // Handlers
</script>

<div class="component-name">
  <!-- Markup -->
</div>

<style lang="scss">
  @import '$lib/styles/variables';

  .component-name {
    // Styles
  }
</style>
```
