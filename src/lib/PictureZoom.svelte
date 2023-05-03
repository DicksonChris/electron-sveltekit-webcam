<script>
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let imageUrl = 'https://source.unsplash.com/random';
  let expanded = false; // state variable to track if the image is expanded or not
  let width = 300; // initial width of the image
  let height = 200; // initial height of the image

  // function to handle the click event on the image
  function handleClick() {
    expanded = !expanded; // toggle the state variable
    if (expanded) {
      // if the image is expanded, set the width and height to fill the screen
      width = window.innerWidth;
      height = window.innerHeight;
    } else {
      // if the image is not expanded, set the width and height to the original values
      width = 300;
      height = 200;
    }
  }
</script>

<style>
  /* some basic styles for the image */
  img {
    display: block;
    margin: 0 auto;
    cursor: pointer;
    object-fit: cover;
  }
</style>

<!-- use the fly transition with cubicOut easing to animate the image -->
<img
  src={imageUrl}
  alt="Random image"
  width={width}
  height={height}
  on:click={handleClick}
  transition:fly={{ x: 0, y: 0, duration: 500, easing: cubicOut }}
/>