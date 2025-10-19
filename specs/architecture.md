# Architecture

## MVC Implementation

### Model Layer

**Location**: `/src/lib/models/`

**Responsibilities**:

- Data structures and interfaces
- Business logic
- Calculation operations
- State management
- Data validation

**Example**:

```typescript
// /src/lib/models/Calculator.ts
export interface CalculatorState {
  currentValue: number;
  previousValue: number | null;
  operation: Operation | null;
  displayValue: string;
}

export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

export class Calculator {
  // Business logic methods
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number | Error;
}
```

### View Layer

**Location**: `/src/routes/`

**Responsibilities**:

- User interface components
- Display logic
- User interaction handling
- Reactive updates

**Example**:

```svelte
<!-- /src/routes/+page.svelte -->
<script lang="ts">
  import { calculatorController } from '$lib/controllers/CalculatorController';
  // View logic only - no business logic
</script>

<div class="calculator">
  <!-- UI elements -->
</div>
```

### Controller Layer

**Location**: `/src/lib/controllers/`

**Responsibilities**:

- Coordinate between Model and View
- Handle user input
- Update model state
- Trigger view updates
- Application flow control

**Example**:

```typescript
// /src/lib/controllers/CalculatorController.ts
import { writable } from 'svelte/store';
import { Calculator, type CalculatorState } from '$lib/models/Calculator';

class CalculatorController {
  private calculator: Calculator;
  public state = writable({...});

  handleNumberInput(digit: number): void
  handleOperationInput(op: Operation): void
  handleEquals(): void
  handleClear(): void
}

export const calculatorController = new CalculatorController();
```

---

## Project Structure

```
calculator-app/
├── src/
│   ├── lib/
│   │   ├── models/
│   │   │   ├── Calculator.ts          # Core calculation logic
│   │   │   ├── Calculator.test.ts     # Unit tests for Calculator
│   │   │   └── CalculatorState.ts     # State interface/type definitions
│   │   ├── controllers/
│   │   │   ├── CalculatorController.ts        # Business logic coordinator
│   │   │   └── CalculatorController.test.ts   # Unit tests for controller
│   │   ├── components/
│   │   │   ├── Calculator.svelte      # Main calculator component
│   │   │   ├── Calculator.test.ts     # Integration tests for calculator
│   │   │   ├── Display.svelte         # Display component
│   │   │   ├── Display.test.ts        # Tests for display component
│   │   │   ├── Button.svelte          # Reusable button component
│   │   │   └── Button.test.ts         # Tests for button component
│   │   ├── styles/
│   │   │   ├── _variables.scss        # SCSS variables
│   │   │   ├── _fonts.scss            # Font imports and definitions
│   │   │   ├── _mixins.scss           # Reusable mixins
│   │   │   └── global.scss            # Global styles
│   │   └── utils/
│   │       ├── formatters.ts          # Number formatting utilities
│   │       └── formatters.test.ts     # Tests for formatters
│   ├── routes/
│   │   ├── +layout.svelte             # Root layout
│   │   ├── +layout.server.ts          # Server-side layout logic
│   │   ├── +page.svelte               # Calculator page (view)
│   │   ├── +page.test.ts              # Tests for calculator page
│   │   └── +page.server.ts            # Server-side page logic
│   ├── hooks.server.ts                # Server-side middleware
│   ├── hooks.client.ts                # Client-side hooks
│   └── app.html                       # HTML template
├── static/
│   └── favicon.png
├── .env.example                        # Environment variable template
├── svelte.config.js                    # SvelteKit configuration
├── vite.config.ts                      # Vite configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json
└── SPEC.md                             # This file
```

---

## Middleware Architecture

### Purpose

Establish standardized, readable patterns for:

- Request/response handling
- Authentication checks
- Logging
- Error handling
- Rate limiting (future)

### Implementation Location

**File**: `/src/hooks.server.ts`

### Middleware Structure

```typescript
// /src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

// Logging middleware
const loggerMiddleware: Handle = async ({ event, resolve }) => {
  const start = Date.now();
  console.log(
    `[${new Date().toISOString()}] ${event.request.method} ${
      event.url.pathname
    }`
  );

  const response = await resolve(event);

  const duration = Date.now() - start;
  console.log(`[${new Date().toISOString()}] Completed in ${duration}ms`);

  return response;
};

// Authentication middleware (placeholder)
const authMiddleware: Handle = async ({ event, resolve }) => {
  // TODO: Implement when Google/Apple auth is added
  // Check for valid session token
  // Attach user to event.locals if authenticated

  return resolve(event);
};

// Error handling middleware
const errorMiddleware: Handle = async ({ event, resolve }) => {
  try {
    return await resolve(event);
  } catch (error) {
    console.error('Unhandled error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};

// Compose middleware in sequence
export const handle: Handle = async ({ event, resolve }) => {
  // Execute middleware in order
  return errorMiddleware({
    event,
    resolve: e1 =>
      loggerMiddleware({
        event: e1,
        resolve: e2 =>
          authMiddleware({
            event: e2,
            resolve,
          }),
      }),
  });
};
```

### Middleware Chain Pattern

Middleware executes in defined order:

1. Error handling (outer wrapper)
2. Logging
3. Authentication
4. Application logic

---

## Routing Structure

### Current Routes

```
/ (root)
├── +layout.svelte           # Root layout with global styles
├── +layout.server.ts        # Server layout logic (auth checks, etc.)
├── +page.svelte             # Calculator page (main view)
└── +page.server.ts          # Server-side calculator logic (if needed)
```

### Future Routes

```
/settings
├── +page.svelte             # Settings page view
└── +page.server.ts          # Settings logic (requires auth)

/account
├── +page.svelte             # Account page view
└── +page.server.ts          # Account logic (requires auth)

/login
├── +page.svelte             # Login page
└── +page.server.ts          # OAuth redirect handlers

/api
├── auth/
│   ├── callback/+server.ts  # OAuth callbacks
│   └── logout/+server.ts    # Logout endpoint
└── calculations/
    └── +server.ts           # Save calculation history
```

---

## Code Organization Principles

### Single Responsibility

Each module/component should have one clear purpose

### DRY (Don't Repeat Yourself)

Extract reusable logic into utilities or shared functions

### Separation of Concerns

- Models: Data and business logic only
- Views: Presentation logic only
- Controllers: Coordination between models and views

### Readability Over Cleverness

Favor clear, explicit code over complex one-liners
