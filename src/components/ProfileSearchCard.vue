<template>
  <div class="col-12 mt-4 bg-light shadow">
    <div class="p-3 d-flex">
      <router-link router-link :to="{ name: 'Profile', params: {id: profile._id } }"  class="">
        <img :src="profile.picture" :alt="profile.name" class="md-prof-pic mb-2 mr-2">
      </router-link>
      <div class="d-flex pl-2 flex-column justify-content-center">
        <p class="m-0 p-0 minor-text">{{profile.class}}</p>
        <h3 class="m-0 p-0"><b>{{profile.name}}</b></h3>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { announcementsService } from '../services/AnnouncementsService'

export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      profiles: computed(()=> AppState.profiles)
    }
  }
}
</script>


<style lang="scss" scoped>
.md-prof-pic{
  height: 7vw;
  width: 7vw;
  border-radius: 50%;
  object-fit:cover;
}
</style>