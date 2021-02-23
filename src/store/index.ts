// store.ts
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
  todos: Todo[];
}

// define injection key
export const key: InjectionKey <Store <State> > = Symbol()

export const store = createStore <State>({
  state: {
    todos: []
  },
  mutations: {
    ADD_ITEM (state, todo: Todo) {
      state.todos.push(todo)
    },
    DELETE_ITEM (state, todo: Todo) {
      const index = state.todos.findIndex(item => todo.id === item.id)
      state.todos.splice(index, 1)
    }
  },
  actions: {
    addTodo ({ commit }, todo: Todo) {
      commit('ADD_ITEM', todo)
    },
    removeTodo ({ commit }, todo: Todo) {
      commit('DELETE_ITEM', todo)
    }
  },
  getters: {
    todos: state => state.todos
  }
})

export default {
  store,
  key
}
