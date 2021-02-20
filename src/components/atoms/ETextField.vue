<template>
  <label>
    {{ label }}
    <input type="text" />
  </label>
</template>

<script>
import { ref, toRef } from 'vue'
export default {
  name: 'ETextField',
  setup (props) {
    const label = toRef(props.label, 'label')

    return {
      label
    }
  }
}
</script>

<style scoped lang="scss">

input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

</style>
