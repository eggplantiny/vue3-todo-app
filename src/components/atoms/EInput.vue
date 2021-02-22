<template>
  <label>
    {{ label }}
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'EInput',
  props: {
    label: String,
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  setup (...params) {
    const value = ref('')

    console.log(params)
    return {
      value
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
