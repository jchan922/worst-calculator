<script lang="ts">
  /**
   * Main calculator component
   */

  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { calculatorStore } from '$lib/stores/calculatorStore';
  import Button from './Button.svelte';
  import Display from './Display.svelte';

  const { state } = calculatorStore;

  /**
   * Handle keyboard input for calculator operations
   */
  function handleKeydown(event: KeyboardEvent): void {
    const key = event.key;

    // Prevent default behavior for calculator keys to avoid page scrolling, etc.
    if (isCalculatorKey(key)) {
      event.preventDefault();
    }

    // Numbers 0-9
    if (/^[0-9]$/.test(key)) {
      calculatorStore.handleNumberInput(key);
      return;
    }

    // Operations
    switch (key) {
      case '+':
        calculatorStore.handleOperationInput('add');
        break;
      case '-':
        calculatorStore.handleOperationInput('subtract');
        break;
      case '*':
      case 'x':
      case 'X':
        calculatorStore.handleOperationInput('multiply');
        break;
      case '/':
        calculatorStore.handleOperationInput('divide');
        break;
      case 'Enter':
      case '=':
        calculatorStore.handleEquals();
        break;
      case '.':
      case ',':
        calculatorStore.handleDecimal();
        break;
      case 'Escape':
        calculatorStore.handleAllClear();
        break;
      case 'Backspace':
      case 'Delete':
        calculatorStore.handleClear();
        break;
    }
  }

  /**
   * Check if the key is a calculator key
   */
  function isCalculatorKey(key: string): boolean {
    return /^[0-9+\-*/=.,]$/.test(key) ||
           key === 'Enter' ||
           key === 'Escape' ||
           key === 'Backspace' ||
           key === 'Delete' ||
           key === 'x' ||
           key === 'X';
  }

  onMount(() => {
    if (browser) {
      window.addEventListener('keydown', handleKeydown);

      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  });
</script>

<div class="calculator">
  <Display value={$state.displayValue} />

  <div class="button-grid">
    <Button value="AC" variant="clear" onClick={() => calculatorStore.handleAllClear()} />
    <Button value="C" variant="clear" onClick={() => calculatorStore.handleClear()} />
    <Button
      value="÷"
      variant="operator"
      onClick={() => calculatorStore.handleOperationInput('divide')}
    />
    <Button
      value="×"
      variant="operator"
      onClick={() => calculatorStore.handleOperationInput('multiply')}
    />

    <Button value="7" onClick={() => calculatorStore.handleNumberInput('7')} />
    <Button value="8" onClick={() => calculatorStore.handleNumberInput('8')} />
    <Button value="9" onClick={() => calculatorStore.handleNumberInput('9')} />
    <Button
      value="−"
      variant="operator"
      onClick={() => calculatorStore.handleOperationInput('subtract')}
    />

    <Button value="4" onClick={() => calculatorStore.handleNumberInput('4')} />
    <Button value="5" onClick={() => calculatorStore.handleNumberInput('5')} />
    <Button value="6" onClick={() => calculatorStore.handleNumberInput('6')} />
    <Button
      value="+"
      variant="operator"
      onClick={() => calculatorStore.handleOperationInput('add')}
    />

    <Button value="1" onClick={() => calculatorStore.handleNumberInput('1')} />
    <Button value="2" onClick={() => calculatorStore.handleNumberInput('2')} />
    <Button value="3" onClick={() => calculatorStore.handleNumberInput('3')} />
    <Button
      value="="
      variant="equals"
      onClick={() => calculatorStore.handleEquals()}
      span={1}
    />

    <Button value="0" onClick={() => calculatorStore.handleNumberInput('0')} span={2} />
    <Button value="." onClick={() => calculatorStore.handleDecimal()} />
  </div>

  <div class="keyboard-hint" aria-hidden="true">
    Keyboard supported
  </div>
</div>

<style lang="scss">
  @use '$lib/styles/variables' as *;

  .calculator {
    background-color: var(--card-bg);
    border-radius: $border-radius;
    padding: $spacing-lg;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: $calculator-width;
    max-width: 100%;
    transition: var(--theme-transition);
  }

  .button-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-sm;
  }

  .keyboard-hint {
    margin-top: $spacing-md;
    text-align: center;
    font-size: $font-size-sm;
    color: var(--text-secondary);
    opacity: 0.7;
    font-weight: 500;
  }
</style>
