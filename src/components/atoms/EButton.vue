<template>
  <button>
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'EButton'
}
</script>

<style scoped lang="scss">
  button {
    padding: 0.5em 0.75em;
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1em;

    background-color: #4CAF50;
    color: white;
  }

  button:hover {
    background-color: #45a049;
  }
</style>
