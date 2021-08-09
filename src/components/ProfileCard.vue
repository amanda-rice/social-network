<template>
  <div class="col-12 mt-4 bg-light shadow">
    <div class="p-3 d-flex flex-column">
      <div class="cover-parent" id="bg-image">
        <img class="img-fit" :src="profile.coverImg" alt="cover image">
        <div class="parent-sm">
          <img
          :src="profile.picture"
          alt="profile.name"
          class = "md-prof-pic border-primary spill child1"
          />
          <div v-if="profile.graduated" class="child2">
            <img src="../assets/img/school.png" alt="graduated" class="border-primary circle-img-sm bg-light p-1">
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column">
          <p class="m-0 p-0 minor-text">{{profile.class}}</p>
          <h3 class="text-overflow p-0 mt-0">{{ profile.name }}</h3>
        </div>
        <div class="d-flex">
          <div v-if="profile.linkedin" class="d-flex text-left">
            <a :href="profile.linkedin">
            <img
            alt="linkedIn"
            src="../assets/img/linkedin.png"
            height="35"
            width="35"
            title="LinkedIn"
            /></a>
          </div>
          <div v-if="profile.github" class="d-flex text-left">
            <a :href="profile.github">
            <img
            alt="GitHub"
            src="../assets/img/github.png"
            height="35"
            width="35"
            title="GitHub"
            /></a>
          </div>
          <div v-if="profile.resume" class="d-flex text-left">
            <div class="action hoverable" data-toggle="modal" data-target="#resume-modal-profile">
              <img
              alt="Resume"
              src="../assets/img/file.png"
              height="35"
              width="35"
            title="Resume"
              />
          </div>
          </div>
        </div>
      </div>
      <div v-if="profile.bio">
        <p class="pt-2 text-overflow">{{ profile.bio }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
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
  max-height: 150px; 
}
.spill{
    bottom: -10vh;
}
</style>