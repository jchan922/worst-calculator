<script lang="ts">
  import Calculator from '$lib/components/Calculator.svelte';
  import type { PageData } from './$types';

  // Access data from +page.server.ts
  export let data: PageData;
</script>

<svelte:head>
  <title>{data.header}</title>
</svelte:head>

<main>
  <h1>{data.header}</h1>
  <p class="timestamp">Loaded at: {new Date(data.timestamp).toLocaleString()}</p>
  <Calculator />
</main>

<style lang="scss">
  @use '$lib/styles/variables' as *;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: $spacing-lg;
  }

  h1 {
    font-size: 2.5rem;
    color: $text-color;
    font-weight: 700;
  }

  .timestamp {
    font-size: 0.875rem;
    color: #666;
    margin-top: -$spacing-md;
  }
</style>
