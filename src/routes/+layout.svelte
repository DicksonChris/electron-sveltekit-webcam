<script lang="ts">
  import TitleBar from '$lib/windowTitleBar/WindowWrapper.svelte'
  import '../app.postcss'
  import { onMount } from 'svelte'

  let ready = false
  onMount(() => (ready = true))
</script>

{#if ready}
  <TitleBar>
  <div class="px-4">
    <a href="/">Home</a>
    <slot />
  </div>

  </TitleBar>
{/if}