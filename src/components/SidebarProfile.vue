<template>
  <div class="component bg-light ml-0 pb-4 shadow">
    <div class="d-flex flex-column text-center">
      <div class="col-12">
        <div class="pt-5 pb-2 parent w-100">
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
        <div class="px-3 mt-4 d-flex flex-column text-left">
          <p class="minor-text p-0 m-0">{{ profile.class }}</p>
          <h2 class="text-overflow p-0 mt-0">{{ profile.name }}</h2>
          <div v-if="profile.linkedin" class="d-flex text-left">
            <a :href="profile.linkedin">
            <img
            alt="linkedIn logo"
            src="../assets/img/linkedin.png"
            height="25"
            width="25"
            title="LinkedIn"
            /></a><p class="text-overflow px-1"> LinkedIn</p>  
          </div>
          <div v-if="profile.github" class="d-flex text-left">
            <a :href="profile.github">
            <img
            alt="GitHub logo"
            src="../assets/img/github.png"
            height="25"
            width="25"
            title="GitHub"
            /></a><p class="text-overflow px-1"> GitHub</p>  
          </div>
          <div v-if="profile.resume" class="d-flex text-left">
            <div class="action hoverable" data-toggle="modal" data-target="#resume-modal-profile">
              <img
              alt="Resume"
              src="../assets/img/file.png"
              height="25"
              width="25"
              title="Resume"
              />
          </div>
          <span class="px-1">Resume</span>
          </div>
        </div>
      </div>
    </div>
  <ResumeModalProfile/>
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