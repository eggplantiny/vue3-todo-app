<template>
  <div class="d-flex">
    <e-input
      v-model="value"
      class="mr-2"
      @keydown.enter="addTodo"
    />
    <e-button
      @click="addTodo"
    >
      Enter
    </e-button>
  </div>
  <div>
    <template
      v-for="(todo, index) in todos"
      :key="index"
    >
      <div class="pt-2 pb-2">
        {{ todo }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">

import { ref, watch, reactive } from 'vue'
import EButton from "@/components/atoms/EButton.vue"
import EInput from "@/components/atoms/EInput.vue"

export default {
  name: 'Playground',
  components: { EInput, EButton },
  setup () {
    const counter = ref <number> (0)
    const value = ref <string> ('Hello World')
    const todos = reactive <string[]> ([])

    const onClickButton = () => { counter.value += 1 }

    watch(counter, value => {
      if (value >= 10) {
        window.alert('Hello World!')
      }
    })

    const addTodo = () => {
      const v = value.value
      todos.push(v)
    }

    return {
      counter,
      value,
      onClickButton,
      addTodo,
      todos
    }
  }
}
</script>

<style scoped lang="scss">

</style>
