import { ActionTree, ActionContext } from 'vuex';

import { RootState } from '@/store';
import { State } from './state';
import { Mutations } from './mutations';
import { Todo } from '@/@types/todo'

import { DbSingleton } from '@/helper/database'

const storeName = 'todos'

type AugmentedActionContext = {
    commit <K extends keyof Mutations> (
        key: K,
        payload: Parameters <Mutations[K]>[1],
    ): ReturnType <Mutations[K]>;
} & Omit <ActionContext <State, RootState>, 'commit'>

export interface Actions {
    addTodo (
        { commit }: AugmentedActionContext,
        todo: Todo,
    ): Promise <null>;
    removeTodo (
        { commit }: AugmentedActionContext,
        todo: Todo,
    ): Promise <null>;
    toggleTodo (
        { commit }: AugmentedActionContext,
        todo: Todo
    ): Promise <null>;
    initialize (
        { commit }: AugmentedActionContext
    ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async addTodo ({ commit }: AugmentedActionContext, todo: Todo): Promise <null> {
        await DbSingleton.getInstance().addItem <Todo> (storeName, todo)
        commit('ADD_ITEM', todo)

        return null
    },
    async removeTodo ({ commit }: AugmentedActionContext, todo: Todo): Promise <null> {
        await DbSingleton.getInstance().deleteItem (storeName, todo.id)
        commit('REMOVE_TODO', todo)

        return null
    },
    async toggleTodo ({ commit }: AugmentedActionContext, todo: Todo): Promise <null> {
        todo = JSON.parse(JSON.stringify(todo))
        todo.done = !todo.done

        await DbSingleton.getInstance().updateItem <Todo> (storeName, todo.id, todo)
        commit('UPDATE_TODO', todo)

        return null
    },
    async initialize({ commit }: AugmentedActionContext) {
        const dbHandler: DbSingleton = DbSingleton.getInstance()
        await dbHandler.initialize()

        const todoList: Todo[] = await dbHandler.getAllItems <Todo> (storeName)
        todoList.forEach((todo: Todo) => commit('ADD_ITEM', todo))
    }
}
