<template>
  <div class="component bg-light ml-0 shadow">
    <div class="d-flex flex-column text-center">
      <div class="col-12">
        <div class="pt-5 parent w-100">
          <img
          :src="profile.picture"
          alt="profile.name"
          class = "circle-image border-primary child1"
          />
          <div v-if="profile.graduated" class="child1 child2">
            <img src="../assets/img/school.png" alt="graduated" class="border-primary circle-img bg-light p-1">
        </div>
      </div>
        </div>
      <p class="minor-text">{{ profile.class }}</p>
      <p class="large-name overflow-hidden">{{ profile.name }}</p>
      <div class="d-flex text-left">
          <img
          alt="linkedIn logo"
          src="../assets/img/linkedin.png"
          height="25"
          width="25"
          /><p> {{profile.linkedin}}</p>  
        </div>
        <div class="d-flex text-left">
          <img
          alt="GitHub logo"
          src="../assets/img/github.png"
          height="25"
          width="25"
          /><p> {{profile.github}}</p>  
        </div>
        <p>Resume</p>
      </div>
  </div>
</template>


<script>
import { AppState } from '../AppState'
import { computed, reactive} from 'vue'
import Pop from '../utils/Notifier'
import {usersService} from '../services/UsersService'

export default {
  setup() {
    const state = reactive({
      dropOpen: false,
    })
    return {
      state,
      profile: computed(() => AppState.profile),
    }
  }
}
</script>

<style scoped>
.large-name{
  font-size: 30px;
  font-weight: 600;
}
</style>