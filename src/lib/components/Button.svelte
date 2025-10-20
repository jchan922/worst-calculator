<script lang="ts">
  /**
   * Reusable calculator button component
   */

  export let value: string;
  export let onClick: () => void;
  export let variant: 'number' | 'operator' | 'clear' | 'equals' = 'number';
  export let span: number = 1;
</script>

<button
  class="calculator-button {variant}"
  style="grid-column: span {span}"
  on:click={onClick}
  type="button"
>
  {value}
</button>

<style lang="scss">
  @use '$lib/styles/variables' as *;
  @use '$lib/styles/mixins' as *;

  .calculator-button {
    @include button-base;
    height: $button-size;
    background-color: var(--button-bg);
    color: var(--text-color);
    border: 1px solid var(--button-border);
    font-size: $font-size-lg;
    user-select: none;
    transition: var(--theme-transition);

    &:hover {
      background-color: var(--button-hover);
    }

    &:active {
      background-color: var(--button-active);
    }

    &.operator {
      background-color: var(--operator-bg);
      color: white;

      &:hover {
        background-color: var(--operator-hover);
      }

      &:active {
        opacity: 0.8;
      }
    }

    &.clear {
      background-color: var(--error-color);
      color: white;

      &:hover {
        opacity: 0.9;
      }

      &:active {
        opacity: 0.8;
      }
    }

    &.equals {
      background-color: var(--primary-color);
      color: white;

      &:hover {
        opacity: 0.9;
      }

      &:active {
        opacity: 0.8;
      }
    }
  }
</style>
