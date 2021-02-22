<template>
  <div class="d-flex">
    <e-input
      v-model="value"
      class="mr-2"
      @keydown.enter="hello"
    />
    <e-button>
      Enter
    </e-button>
  </div>
</template>

<script lang="ts">

import { ref, watch } from 'vue'
import EButton from "@/components/atoms/EButton.vue"
import EInput from "@/components/atoms/EInput.vue";

export default {
  name: 'Playground',
  components: { EInput, EButton },
  setup () {
    const counter = ref(0)
    const value = ref('Hello World')

    const onClickButton = () => { counter.value += 1 }

    watch(counter, value => {
      if (value >= 10) {
        window.alert('Hello World!')
      }
    })

    const hello = () => { console.log(value.value) }

    return {
      counter,
      value,
      onClickButton,
      hello
    }
  }
}
</script>

<style scoped lang="scss">

</style>
