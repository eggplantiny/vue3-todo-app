export const mutations = {
    ADD_ITEM(state, todo) {
        state.todos.push(todo);
    },
    REMOVE_TODO(state, todo) {
        const index = state.todos.findIndex((item) => item.id === todo.id);
        state.todos.splice(index, 1);
    },
    TOGGLE_TODO(state, todo) {
        const index = state.todos.findIndex((item) => item.id === todo.id);
        todo.done = !todo.done;
        state.todos.splice(index, 1, todo);
    }
};
//# sourceMappingURL=mutations.js.map