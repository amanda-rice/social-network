<template>
  <div class="row justify-content-center p-3">
    <AnnouncementCard v-for="a in announcements" :key="a.id" :announcement="a"/>
  </div>
</template>


<script>
export default {
  name: 'Thread',
  props: {
    announcements: {
      type: Array,
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>

</style>