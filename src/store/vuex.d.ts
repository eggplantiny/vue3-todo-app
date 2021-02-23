import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {

    interface State {
        todos: Todo[];
    }

    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
