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
        {{ todo.text }}
        <e-button @click="deleteTodo(todo)">
          Delete
        </e-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">

import { ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import EButton from '@/components/atoms/EButton.vue'
import EInput from '@/components/atoms/EInput.vue'
import  { generateId } from '@/helper/utils'

export default {
  name: 'Playground',
  components: { EInput, EButton },
  setup () {
    const store = useStore(key)
    const value = ref <string> ('')
    const todos: Todo[] = store.getters['todos']

    const addTodo = () => {
      const todo: Todo = {
        text: value.value,
        id: generateId(),
        complete: false
      }

      store.dispatch('addTodo',todo)
    }

    const deleteTodo = (todo: Todo) => {
      store.dispatch('removeTodo', todo)
    }

    return {
      value,
      todos,
      addTodo,
      deleteTodo
    }
  }
}
</script>

<style scoped lang="scss">

</style>
