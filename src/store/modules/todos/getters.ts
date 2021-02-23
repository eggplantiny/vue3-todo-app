import { GetterTree } from 'vuex'
import { Todo } from '@/@types'
import { State } from '@/store/modules/todos/state'
import { RootState } from '@/store';

export type Getters = {
    todos (state: State): Todo[];
};

export const getters: GetterTree<State, RootState> & Getters = {
    todos (state: State): Todo[] {
        return state.todos;
    }
};
