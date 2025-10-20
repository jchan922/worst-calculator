<script lang="ts">
  /**
   * Calculator display component
   */

  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import type { Operation } from '$lib/models/Calculator';

  export let value: string;
  export let previousValue: number | null = null;
  export let operation: Operation | null = null;

  /**
   * Format operation symbol for display
   */
  function getOperationSymbol(op: Operation | null): string {
    if (!op) return '';

    const symbols: Record<Operation, string> = {
      add: '+',
      subtract: '−',
      multiply: '×',
      divide: '÷'
    };

    return symbols[op];
  }

  $: operationDisplay = previousValue !== null && operation
    ? `${previousValue} ${getOperationSymbol(operation)}`
    : '';
</script>

<div class="display" data-testid="display">
  {#if operationDisplay}
    <div
      class="operation-indicator"
      aria-label="Current operation"
      transition:slide={{ duration: 150 }}
    >
      {operationDisplay}
    </div>
  {/if}
  <div class="current-value">
    {value}
  </div>
</div>

<style lang="scss">
  @use '$lib/styles/variables' as *;

  .display {
    background-color: var(--display-bg);
    color: var(--display-text);
    padding: $spacing-md $spacing-lg;
    text-align: right;
    border-radius: $border-radius;
    margin-bottom: $spacing-md;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    font-family: 'Courier New', monospace;
    transition: var(--theme-transition);
    gap: $spacing-xs;
  }

  .operation-indicator {
    font-size: $font-size-base;
    font-weight: 400;
    opacity: 0.7;
    color: var(--display-text);
    min-height: 20px;
  }

  .current-value {
    font-size: $font-size-display;
    font-weight: 600;
    word-break: break-all;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
