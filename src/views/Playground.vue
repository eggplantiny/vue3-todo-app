<template>
  <div>
    <div>
      <e-button @click="onClickButton">
        Hello World
      </e-button>
    </div>
    <div>
      {{ counter }}
    </div>
    <div>
      <e-input
        v-model="value"
        label="Hello World"
      />
    </div>
    <div>
      {{ value }}
    </div>
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

    return {
      counter,
      value,
      onClickButton
    }
  }
}
</script>

<style scoped lang="scss">

</style>
