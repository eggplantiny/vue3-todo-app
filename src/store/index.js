import { createStore } from 'vuex';
// define injection key
export const key = Symbol();
export const store = createStore({
    state: {
        todos: []
    },
    mutations: {
        ADD_ITEM(state, todo) {
            state.todos.push(todo);
        },
        DELETE_ITEM(state, todo) {
            const index = state.todos.findIndex(item => todo.id === item.id);
            state.todos.splice(index, 1);
        }
    },
    actions: {
        addTodo({ commit }, todo) {
            commit('ADD_ITEM', todo);
        },
        removeTodo({ commit }, todo) {
            commit('DELETE_ITEM', todo);
        }
    },
    getters: {
        todos: state => state.todos
    }
});
export default {
    store,
    key
};
//# sourceMappingURL=index.js.map