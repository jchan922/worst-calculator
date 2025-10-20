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

### Test File Template

Use this template as a starting point for all unit test files:

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ClassUnderTest, type CustomType } from './ClassUnderTest';
import { DependencyClass } from './DependencyClass';

describe('ClassUnderTest', () => {
  let instance: ClassUnderTest;
  let mockDependency: DependencyClass;
  let spyMethodName: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Setup: Create fresh instances, mock dependencies, reset state
    mockDependency = {
      methodName: vi.fn().mockReturnValue('mocked value'),
      anotherMethod: vi.fn().mockResolvedValue({ data: 'async result' })
    } as any;

    instance = new ClassUnderTest(mockDependency);

    // Create spies for class methods
    spyMethodName = vi.spyOn(instance, 'methodName');
  });

  afterEach(() => {
    // Cleanup: Clear mocks, close connections, reset global state
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  describe('methodName()', () => {
    // Data-driven tests for similar cases
    [
      { title: 'should handle typical case', input: value1, expected: result1 },
      { title: 'should handle edge case', input: value2, expected: result2 },
      { title: 'should handle boundary condition', input: value3, expected: result3 }
    ].forEach(({ title, input, expected }) => {
      it(title, () => {
        expect(instance.methodName(input)).toBe(expected);
      });
    });

    // Separate test when different assertion type is needed
    it('should handle special case requiring different assertion', () => {
      expect(instance.methodName(value)).toBeCloseTo(expected);
    });

    // Error condition tests
    [
      { title: 'should throw when invalid input', input: badValue1 },
      { title: 'should throw when boundary exceeded', input: badValue2 }
    ].forEach(({ title, input }) => {
      it(title, () => {
        expect(() => instance.methodName(input)).toThrow('Error message');
      });
    });
  });

  describe('methodWithDependency()', () => {
    it('should call dependency method with correct arguments', () => {
      instance.methodWithDependency(arg1, arg2);

      expect(mockDependency.methodName).toHaveBeenCalledWith(arg1, arg2);
      expect(mockDependency.methodName).toHaveBeenCalledTimes(1);
    });

    it('should use value returned from dependency', () => {
      const result = instance.methodWithDependency();

      expect(result).toBe('mocked value');
    });
  });

  describe('methodToSpy()', () => {
    it('should track method calls with spy', () => {
      instance.methodToSpy(arg);

      expect(spyMethodName).toHaveBeenCalledWith(arg);
      expect(spyMethodName).toHaveBeenCalledTimes(1);
    });

    it('should override spy return value for specific test', () => {
      spyMethodName.mockReturnValue('custom value');

      const result = instance.methodToSpy();

      expect(result).toBe('custom value');
    });
  });

  describe('asyncMethod()', () => {
    it('should handle async operations', async () => {
      const result = await instance.asyncMethod();

      expect(mockDependency.anotherMethod).toHaveBeenCalled();
      expect(result).toEqual({ data: 'async result' });
    });

    it('should handle async errors', async () => {
      mockDependency.anotherMethod.mockRejectedValue(new Error('Async error'));

      await expect(instance.asyncMethod()).rejects.toThrow('Async error');
    });
  });
});
```

### Test Structure Patterns

#### One Describe Block Per Method

- Each public method gets its own `describe` block
- Encapsulates all tests (standard cases + edge cases) for that method
- Makes navigation and maintenance easier

**Template**:
```typescript
describe('ClassName', () => {
  describe('methodOne()', () => {
    // All methodOne tests
  });

  describe('methodTwo()', () => {
    // All methodTwo tests
  });
});
```

#### Setup and Teardown

Use `beforeEach` and `afterEach` for consistent test environments:

**beforeEach**: Run before each test
- Create fresh instances
- Initialize mock data
- Reset state
- Set up test fixtures

**afterEach**: Run after each test (optional)
- Clear timers/intervals
- Close database connections
- Reset mocked modules
- Clean up side effects

**Template**:
```typescript
describe('ClassName', () => {
  let instance: ClassName;
  let mockDependency: MockType;

  beforeEach(() => {
    mockDependency = createMock();
    instance = new ClassName(mockDependency);
  });

  afterEach(() => {
    // Only include if cleanup is necessary
    mockDependency.cleanup();
  });
});
```

#### Data-Driven Testing with Inline Arrays

Use inline arrays with `.forEach()` for testing multiple similar cases:

**Benefits**:
- Reduces duplication
- Easy to add new test cases
- Clear at a glance
- Self-documenting

**Template**:
```typescript
describe('methodName()', () => {
  [
    { title: 'descriptive test name', param1: value1, param2: value2, expected: result },
    { title: 'another test case', param1: value3, param2: value4, expected: result2 }
    // Add more cases easily
  ].forEach(({ title, param1, param2, expected }) => {
    it(title, () => {
      expect(instance.methodName(param1, param2)).toBe(expected);
    });
  });
});
```

#### When to Keep Tests Separate

Not all tests should be data-driven. Keep tests separate when:

**1. Different assertion types needed**:
```typescript
describe('methodName()', () => {
  // Data-driven for exact matches
  [
    { title: 'test case', input: value, expected: result }
  ].forEach(({ title, input, expected }) => {
    it(title, () => {
      expect(instance.methodName(input)).toBe(expected);
    });
  });

  // Separate for floating-point comparisons
  it('should handle decimals with precision', () => {
    expect(instance.methodName(0.1)).toBeCloseTo(0.3);
  });

  // Separate for complex assertions
  it('should return object with correct shape', () => {
    const result = instance.methodName();
    expect(result).toHaveProperty('key');
    expect(result.key).toBeGreaterThan(0);
  });
});
```

**2. Complex setup or teardown within specific test**:
```typescript
it('should handle async operation', async () => {
  const promise = instance.asyncMethod();
  await waitFor(() => expect(someCondition).toBe(true));
  const result = await promise;
  expect(result).toBe(expected);
});
```

#### Type Safety in Tests

Use type assertions to maintain TypeScript type safety:

**Template**:
```typescript
describe('methodWithTypes()', () => {
  [
    { title: 'test case', operation: 'create' as OperationType, expected: result },
    { title: 'another case', operation: 'update' as OperationType, expected: result2 }
  ].forEach(({ title, operation, expected }) => {
    it(title, () => {
      expect(instance.methodWithTypes(operation)).toBe(expected);
    });
  });
});
```

#### Edge Cases Within Method Describes

Keep edge cases **within** their method's describe block, not in a separate section:

**Good** ✅:
```typescript
describe('divide()', () => {
  // Standard cases
  [
    { title: 'should divide positive numbers', a: 10, b: 2, expected: 5 }
  ].forEach(({ title, a, b, expected }) => {
    it(title, () => {
      expect(instance.divide(a, b)).toBe(expected);
    });
  });

  // Edge cases stay with the method
  it('should throw when dividing by zero', () => {
    expect(() => instance.divide(5, 0)).toThrow('Division by zero');
  });
});
```

**Avoid** ❌:
```typescript
describe('divide()', () => {
  it('should divide positive numbers', () => { ... });
});

describe('Edge Cases', () => {
  // ❌ Separated from method - harder to maintain
  it('should handle division by zero', () => { ... });
});
```

#### Mocks and Spies

Use Vitest's `vi` mock functions and spies to test interactions with dependencies.

**Mocks**: Create fake implementations of dependencies
- Use `vi.fn()` to create mock functions
- Use `mockReturnValue()` for synchronous returns
- Use `mockResolvedValue()` for async returns
- Use `mockRejectedValue()` for async errors

**Spies**: Watch calls to existing methods without replacing them
- Use `vi.spyOn()` to track method calls
- Can override return values when needed
- Useful for testing internal method calls

**Mock Template**:
```typescript
describe('ClassWithDependencies', () => {
  let mockDependency: DependencyType;

  beforeEach(() => {
    mockDependency = {
      syncMethod: vi.fn().mockReturnValue('sync result'),
      asyncMethod: vi.fn().mockResolvedValue({ data: 'async result' }),
      errorMethod: vi.fn().mockRejectedValue(new Error('Error message'))
    } as any;
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear call history
    vi.restoreAllMocks(); // Restore original implementations
  });

  it('should call dependency with correct arguments', () => {
    instance.methodUnderTest(arg1, arg2);

    expect(mockDependency.syncMethod).toHaveBeenCalledWith(arg1, arg2);
    expect(mockDependency.syncMethod).toHaveBeenCalledTimes(1);
  });

  it('should use mocked return value', () => {
    const result = instance.methodUnderTest();

    expect(result).toBe('sync result');
  });
});
```

**Spy Template**:
```typescript
describe('ClassWithSpies', () => {
  let instance: ClassUnderTest;
  let spyInternalMethod: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    instance = new ClassUnderTest();
    spyInternalMethod = vi.spyOn(instance, 'internalMethod');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call internal method when public method is invoked', () => {
    instance.publicMethod(arg);

    expect(spyInternalMethod).toHaveBeenCalledWith(arg);
    expect(spyInternalMethod).toHaveBeenCalledTimes(1);
  });

  it('should override spy return value for specific test', () => {
    spyInternalMethod.mockReturnValue('custom value');

    const result = instance.publicMethod();

    expect(result).toBe('custom value');
  });
});
```

**Common Mock Assertions**:
```typescript
// Check if function was called
expect(mockFn).toHaveBeenCalled();

// Check call count
expect(mockFn).toHaveBeenCalledTimes(2);

// Check arguments
expect(mockFn).toHaveBeenCalledWith(arg1, arg2);

// Check last call arguments
expect(mockFn).toHaveBeenLastCalledWith(arg1, arg2);

// Check nth call arguments (0-indexed)
expect(mockFn).toHaveBeenNthCalledWith(1, arg1, arg2);

// Get all calls
const calls = mockFn.mock.calls;
expect(calls[0][0]).toBe(arg1);

// Get all results
const results = mockFn.mock.results;
expect(results[0].value).toBe('result');
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
