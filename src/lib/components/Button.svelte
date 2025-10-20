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
  @import '$lib/styles/variables';
  @import '$lib/styles/mixins';

  .calculator-button {
    @include button-base;
    height: $button-size;
    background-color: $button-bg;
    color: $text-color;
    border: 1px solid #ddd;
    font-size: $font-size-lg;
    user-select: none;

    &:hover {
      background-color: $button-hover;
    }

    &:active {
      background-color: $button-active;
    }

    &.operator {
      background-color: $operator-bg;
      color: white;

      &:hover {
        background-color: $operator-hover;
      }

      &:active {
        background-color: darken($operator-bg, 15%);
      }
    }

    &.clear {
      background-color: $error-color;
      color: white;

      &:hover {
        background-color: darken($error-color, 5%);
      }

      &:active {
        background-color: darken($error-color, 10%);
      }
    }

    &.equals {
      background-color: $primary-color;
      color: white;

      &:hover {
        background-color: darken($primary-color, 5%);
      }

      &:active {
        background-color: darken($primary-color, 10%);
      }
    }
  }
</style>
