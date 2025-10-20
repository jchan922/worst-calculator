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
  @use 'sass:color';

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
        background-color: color.adjust($operator-bg, $lightness: -15%);
      }
    }

    &.clear {
      background-color: $error-color;
      color: white;

      &:hover {
        background-color: color.adjust($error-color, $lightness: -5%);
      }

      &:active {
        background-color: color.adjust($error-color, $lightness: -10%);
      }
    }

    &.equals {
      background-color: $primary-color;
      color: white;

      &:hover {
        background-color: color.adjust($primary-color, $lightness: -5%);
      }

      &:active {
        background-color: color.adjust($primary-color, $lightness: -10%);
      }
    }
  }
</style>
