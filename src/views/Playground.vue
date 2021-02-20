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
  </div>
</template>

<script lang="ts">

import { ref, watch } from 'vue'
import EButton from "@/components/atoms/EButton.vue"

export default {
  name: 'Playground',
  components: { EButton },
  setup () {
    const counter = ref(0)

    const onClickButton = () => { counter.value += 1 }

    watch(counter, value => {
      if (value >= 10) {
        window.alert('Hello World!')
      }
    })

    return {
      counter,
      onClickButton
    }
  }
}
</script>

<style scoped lang="scss">

</style>
