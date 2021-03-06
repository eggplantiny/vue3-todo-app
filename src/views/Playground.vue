<template>
  <section>
    <div class="flex mt-4">
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
    <div class="text-right mt-2">
      <span class="mr-2">
        Last Action: {{ lastAction }}
      </span>
      <span class="mr-2">
        Done: {{ progressCount }}
      </span>
      <span class="mr-2">
        Left: {{ allCount - progressCount }}
      </span>
    </div>
    <div>
      <template
        v-for="(todo, index) in todos"
        :key="index"
      >
        <div
          class="pt-2 pb-2 d-flex justify-space-between"
        >
          <div :class="[todo.done ? 'checked' : '']">
            {{ todo.text }}
          </div>
          <div>
            <e-button
              class="mr-1"
              @click="toggleTodo(todo)"
            >
              {{ todo.done ? 'Done' : 'Check' }}
            </e-button>
            <e-button
              @click="deleteTodo(todo)"
            >
              Delete
            </e-button>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script lang="ts">

import {computed, ref, watch, onMounted} from 'vue'
import {useStore} from 'vuex'

import {generateId} from '@/helper/utils'
import {LastAction, Todo} from '@/@types'

import EButton from '@/components/atoms/EButton.vue'
import EInput from '@/components/atoms/EInput.vue'

import {
  DbSingleton
} from '@/helper/database'

export default {
  name: 'Playground',
  components: { EInput, EButton },
  setup () {
    const store = useStore()
    const value = ref <string> ('')
    const todos: Todo[] = store.getters['todo/todos']
    const lastAction = ref <LastAction> (0)

    const initializeDatabase = () => store.dispatch('todo/initialize')

    onMounted(initializeDatabase)

    const addTodo = async () => {
      const text = value.value
      const id = generateId()
      const done = false
      const date = new Date()

      if (text.length === 0) {
        return window.alert('Please enter todo.')
      }

      const todo: Todo = {
        text,
        id,
        done,
        date
      }

      await store.dispatch('todo/addTodo',todo)
      value.value = ''
      lastAction.value = LastAction.ADD
    }

    const deleteTodo = async (todo: Todo) => {
      const yes = window.confirm('Would you wanna remove this todo?')

      if (!yes) {
        return
      }

      await store.dispatch('todo/removeTodo', todo)
      lastAction.value = LastAction.DELETE
    }

    const toggleTodo = async (todo: Todo) => {
      await store.dispatch('todo/toggleTodo', todo)
      lastAction.value = LastAction.TOGGLE
    }

    const progressCount = computed(() => todos.filter((todo: Todo) => todo.done).length)
    const allCount = computed(() => todos.length)

    watch(progressCount, () => {
      if (lastAction.value !== LastAction.TOGGLE) {
        return
      }

      if (progressCount.value === allCount.value) {
        window.alert('You done all todo!')
      }
    })

    return {
      value,
      todos,
      allCount,
      progressCount,
      lastAction,
      addTodo,
      deleteTodo,
      toggleTodo
    }
  }
}
</script>

<style scoped lang="scss">
  section {
    max-width: 800px;
    margin: auto;
  }

  .checked {
    text-decoration: line-through;
  }
</style>
