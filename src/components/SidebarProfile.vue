<template>
  <div class="component">
    <span class="navbar-text">
      <div class="d-flex flex-column text-center">
        <div class="d-flex flex-column align-items-center pt-5">
          <img
          :src="profile.picture"
          alt="profile.name"
          height="200"
          width="150"
          class="rounded"
          object-fit="cover"
          />
          </div>
      </div> 
      <h1 class="large-name">{{ profile.name }}</h1>
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
      </span>
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