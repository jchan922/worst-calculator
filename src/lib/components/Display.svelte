<script lang="ts">
  /**
   * Calculator display component
   */

  export let value: string;
</script>

<div class="display" data-testid="display">
  {value}
</div>

<style lang="scss">
  @use '$lib/styles/variables' as *;

  .display {
    background-color: $display-bg;
    color: $display-text;
    padding: $spacing-lg;
    text-align: right;
    font-size: $font-size-display;
    font-weight: 600;
    border-radius: $border-radius;
    margin-bottom: $spacing-md;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    word-break: break-all;
    font-family: 'Courier New', monospace;
  }
</style>
