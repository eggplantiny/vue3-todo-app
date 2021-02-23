import { ActionTree, ActionContext } from 'vuex';

import { RootState } from '@/store';
import { State } from './state';
import { Mutations } from './mutations';
import { Todo } from '@/@types/todo'

type AugmentedActionContext = {
    commit <K extends keyof Mutations> (
        key: K,
        payload: Parameters <Mutations[K]>[1],
    ): ReturnType <Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    addTodo (
        { commit }: AugmentedActionContext,
        todo: Todo,
    ): void;
    removeTodo (
        { commit }: AugmentedActionContext,
        todo: Todo,
    ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
    addTodo ({ commit }: AugmentedActionContext, todo: Todo): void {
        commit('ADD_ITEM', todo)
    },
    removeTodo ({ commit }: AugmentedActionContext, todo: Todo) {
        commit('REMOVE_TODO', todo)
    }
}
