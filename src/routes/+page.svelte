<script lang="ts">
  import Calculator from '$lib/components/Calculator.svelte';
</script>

<svelte:head>
  <title>Worst Calculator</title>
</svelte:head>

<main>
  <h1>Worst Calculator</h1>
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
</style>
