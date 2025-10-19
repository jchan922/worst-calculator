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

### Test Types

#### Unit Tests

**Location**: Next to the file being tested

**Target**: Models, utilities, and individual functions

**Example**:

```typescript
// src/lib/models/Calculator.test.ts
import { describe, it, expect } from 'vitest';
import { Calculator } from './Calculator';

describe('Calculator', () => {
  it('should add two numbers correctly', () => {
    const calc = new Calculator();
    expect(calc.add(2, 3)).toBe(5);
  });

  it('should handle division by zero', () => {
    const calc = new Calculator();
    expect(() => calc.divide(5, 0)).toThrow('Division by zero');
  });
});
```

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
