<script lang="ts">
  /**
   * Main calculator component
   */

  import { calculatorStore } from '$lib/stores/calculatorStore';
  import Button from './Button.svelte';
  import Display from './Display.svelte';

  const { state } = calculatorStore;
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
</style>
