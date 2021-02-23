export const actions = {
    addTodo({ commit }, todo) {
        commit('ADD_ITEM', todo);
    },
    removeTodo({ commit }, todo) {
        commit('REMOVE_TODO', todo);
    }
};
//# sourceMappingURL=actions.js.map