<template>
  <div class="col-12 mt-4 bg-light shadow">
    <div class="p-3 d-flex flex-column">
      <div class="cover-parent">
        <img class="img-fit" :src="profile.coverImg" alt="cover image">
        <div class="parent-sm cover-child2">
          <img
          :src="profile.picture"
          alt="profile.name"
          class = "md-prof-pic border-primary child1"
          />
          <div v-if="profile.graduated" class="child2">
            <img src="../assets/img/school.png" alt="graduated" class="border-primary circle-img-sm bg-light p-1">
          </div>
        </div>
      </div>
      <p class="m-0 p-0 ">{{profile.class}}</p>
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
.img-fit{ 
  object-fit:cover;
  width: 100%; 
  max-height: 100px; 
}
</style>