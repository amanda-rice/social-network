<template>
  <div class="row justify-content-center p-3">
    <MustBuyDisplay v-for="m in mustBuys" :key="m.id" :mustBuy="m"/>
  </div>
</template>


<script>
export default {
  name: 'Thread',
  props: {
    mustBuys: {
      type: Array,
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>

</style>