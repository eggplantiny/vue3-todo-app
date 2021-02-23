import  { MutationTree } from 'vuex'
import { Todo } from "@/@types"
import { State } from './state'

export type Mutations <S = State> = {
    ADD_ITEM (state: S, todo: Todo): void;
    REMOVE_TODO (state: S, todo: Todo): void;
};

export const mutations: MutationTree <State> & Mutations = {
    ADD_ITEM (state: State, todo: Todo) {
        state.todos.push(todo)
    },
    REMOVE_TODO (state: State, todo: Todo) {
        const index = state.todos.findIndex((item: Todo) => item.id === todo.id)
        state.todos.splice(index, 1)
    }
};
