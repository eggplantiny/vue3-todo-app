// store.ts
import { createStore, createLogger } from 'vuex'

import { store as todo, TodoStore, State as TodoState } from '@/store/modules/todos'

export type RootState = {
  Todo: TodoState;
};

export type Store = TodoStore <Pick<RootState, 'Todo'>>

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  plugins,
  modules: {
    todo
  }
})

export function useStore(): Store {
  return store as Store;
}

//
// // define injection key
// export const key: InjectionKey <Store <State> > = Symbol()
//
// export const store = createStore <State> ({
//   state: {
//     todos: []
//   },
//   mutations: {
//     ADD_ITEM (state, todo: Todo) {
//       state.todos.push(todo)
//     },
//     DELETE_ITEM (state, todo: Todo) {
//       const index = state.todos.findIndex(item => todo.id === item.id)
//       state.todos.splice(index, 1)
//     }
//   },
//   actions: {
//     addTodo ({ commit }, todo: Todo) {
//       commit('ADD_ITEM', todo)
//     },
//     removeTodo ({ commit }, todo: Todo) {
//       commit('DELETE_ITEM', todo)
//     }
//   },
//   getters: {
//     todos: state => state.todos
//   }
// })
//
// export default {
//   store,
//   key
// }
