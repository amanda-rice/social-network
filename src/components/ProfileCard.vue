<template>
  <div class="col-12 mt-4 bg-light shadow">
    <div class="p-3 d-flex flex-column">
      <img :src="profile.picture" :alt="profile.name" class="md-prof-pic mb-2 mr-2">
      <p class="m-0 p-0">{{profile.class}}</p>
      <h3 class="m-0 p-0"><b>{{profile.name}}</b></h3>
      <div v-if="profile.bio">
        <p class="pt-2">{{ profile.bio }}</p>
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
  setup() {
    return {
      account: computed(() => AppState.account),
      profile: computed(()=> AppState.profile)
    }
  }
}
</script>


<style lang="scss" scoped>
.md-prof-pic{
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit:cover;
}
</style>