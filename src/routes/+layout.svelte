<script lang="ts">
  import TitleBar from '$lib/windowTitleBar/TitleBar.svelte'
  import '../app.postcss'
  import { onMount } from 'svelte'

  let ready = false
  onMount(() => (ready = true))
</script>

{#if ready}
  <TitleBar>

    <a href="/">Home</a>
    <main class="h-ignore-titlebar px-6">
      <slot />
    </main>

  </TitleBar>
{/if}

<style>
  .h-ignore-titlebar {
    height: calc(100vh - 32px);
  }
</style>
