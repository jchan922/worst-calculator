<script lang="ts">
  import '$lib/styles/global.scss';
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/themeStore';
  import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';

  // Initialize theme on mount
  onMount(() => {
    theme.initialize();
  });
</script>

<div class="app-container">
  <header>
    <div class="header-content">
      <h1 class="logo">🧮</h1>
      <DarkModeToggle />
    </div>
  </header>

  <slot />
</div>

<style lang="scss">
  @use '$lib/styles/variables' as *;

  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    background: var(--surface-color);
    border-bottom: 1px solid var(--button-border);
    padding: $spacing-md $spacing-lg;
    transition: var(--theme-transition);
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    margin: 0;
  }
</style>
