// store.ts
import { createStore, createLogger } from 'vuex';
import { store as todo } from '@/store/modules/todos';
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];
export const store = createStore({
    plugins,
    modules: {
        todo
    }
});
export function useStore() {
    return store;
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
//# sourceMappingURL=index.js.map