import { Todo } from "@/@types"

export interface State {
    todos: Todo[];
}

export const state: State = {
    todos: []
};
