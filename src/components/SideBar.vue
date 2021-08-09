<template>
  <div class="component bg-light ml-0 pb-4 shadow">
    <span class="navbar-text">
      <button
        class="btn btn-outline-primary text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>
      <div v-else class="d-flex flex-column text-center">
        <div class="col-12">

          <div class="pt-5 parent w-100">
            <img
          :src="account.picture"
          alt="account.name"
          class = "circle-image border-primary child1"
          />
          <div v-if="account.graduated" class="child1 child2">
            <img src="../assets/img/school.png" alt="graduated" class="border-primary circle-img bg-light p-1">
          </div>
        </div>
      </div>
        <div class="d-flex justify-content-start flex-column text-left px-3 pt-3">
          <p class="p-0 m-0 minor-text">{{account.class}}</p>
          <div class="dropdown selectable p-0 m-0">
            <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
            >
            <h2 class="large-name overflow-hidden">{{ account.name }}</h2>
          </div>
          <div
          class="dropdown-menu p-0 list-group w-100"
                :class="{ show: state.dropOpen }"
                @click="state.dropOpen = false"
                >
                <div class="list-group-item list-group-item-action hoverable" data-toggle="modal" data-target="#create-account">
                  Update Account
                </div>
                <div
                class="list-group-item list-group-item-action hoverable"
                @click="logout"
                >
                Logout
              </div>
            </div>
          </div>
      </div> 
      <div class="d-flex text-left px-3">
          <img
          alt="linkedIn logo"
          src="../assets/img/linkedin.png"
          height="25"
          width="25"
          /><p class="px-1 text-overflow"> {{account.linkedin}}</p>  
        </div>
        <div class="d-flex text-left px-3">
          <img
          alt="GitHub logo"
          src="../assets/img/github.png"
          height="25"
          width="25"
          /><p class="px-1 text-overflow"> {{account.github}}</p>  
        </div>
        <div class="d-flex text-left px-3">
          <img
          alt="Resume"
          src="../assets/img/file.png"
          height="25"
          width="25"
          />
        <div class="pr-5 action px-1" data-toggle="modal" data-target="#resume-modal">
        <span class="hoverable text-overflow">Resume</span>
      </div>
      </div>
    </div>
    </span>
  </div>
  <ResumeModal/>
</template>


<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import Pop from '../utils/Notifier'
import {usersService} from '../services/UsersService'

export default {
  setup() {
    const state = reactive({
      dropOpen: false,
      updatedAccount: {}
    })
    return {
      state,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      async updateAccount(){
        try {
          await usersService.updateAccount(state.updatedAccount)
          state.updatedAccount = {}
          Pop.toast('Updated Account!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
.large-name{
  font-size: 30px;
  font-weight: 600;
}
.selectable{
  cursor: pointer;
}
</style>