<template>
  <div class="col-12 my-3">
    <div class="">
      <img :src="mustBuy.tall" alt="testing" class="fit-ads w-100">
    </div>
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
.fit-ads{
  object-fit: cover;
}
</style>