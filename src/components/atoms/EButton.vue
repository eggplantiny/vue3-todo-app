<template>
  <button class="
    px-4 py-2 text-white bg-indigo-400 hover:bg-indigo-600
    focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50
    rounded
  "
  :class="$attrs"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'EButton'
}
</script>

<style scoped lang="scss">

</style>
