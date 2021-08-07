<template>
  <div class="col-12 w-100 my-3">
    <img :src="mustBuy.tall" alt="testing">
  </div>
</template>


<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { mustBuysService } from '../services/MustBuysService'
export default {
  props: {
    mustBuy: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>



<style lang="scss" scoped>

</style>