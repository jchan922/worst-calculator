# Features

## Current Features (MVP)

### Basic Operations

- Addition (+)
- Subtraction (-)
- Multiplication (×)
- Division (÷)

### User Interface

- Number buttons (0-9)
- Decimal point button
- Operation buttons
- Equals button
- Clear (C) button
- All Clear (AC) button
- Display showing current value

### Functionality

- Sequential operations
- Decimal number support
- Error handling for division by zero
- Keyboard input support

---

## Future Features (Planned)

### Authentication

- Google OAuth 2.0 integration
- Apple Sign-In integration
- Session management via hooks
- Protected routes

### Additional Pages

- Settings page (`/settings`)
  - Theme selection
  - Decimal precision settings
  - Sound effects toggle
- Account page (`/account`)
  - User profile
  - Calculation history
  - Preferences management

### Advanced Calculator Features

- Scientific operations
- Memory functions (M+, M-, MR, MC)
- History of calculations
- Copy result to clipboard

---

## Future Enhancements

### Phase 2: Authentication

- Implement Google OAuth
- Implement Apple Sign-In
- Add session management
- Create login/logout flow

### Phase 3: Advanced Features

- Scientific calculator mode
- Calculation history
- Theme customization
- Keyboard shortcuts

### Phase 4: Data Persistence

- Save calculation history to database
- User preferences storage
- Cross-device synchronization

---

## Questions & Clarifications

### Open Questions

1. Should we persist calculation history locally (localStorage) before auth is implemented?
2. What decimal precision is required (default: 8 places)?
3. Should we support keyboard input in MVP?

### Assumptions

- Target modern browsers (last 2 versions)
- Desktop and mobile responsive design
- English language only in MVP
