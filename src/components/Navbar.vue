<template>
  <nav class="navbar navbar-expand-lg navbar-dark gradient-bg">
    
     <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1>DevSpace</h1>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse sml-view navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <div
        class="hoverable text-uppercase text-light"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </div>
        </li>
            <li v-if="user.isAuthenticated" class="nav-item"> <span class="text-light text-uppercase hoverable" data-toggle="modal" data-target="#create-account">Update Account</span>
            </li>
             <li v-if="user.isAuthenticated" 
                class="text-light text-uppercase hoverable pl-3"
                @click="logout"
                >
                logout
              </li>
      </ul>
    </div>
    <form @submit.prevent="createAnnouncement" class="d-flex m-2">
        <div class="form-group mr-2">
          <input type="text"
                  id="search"
                  class="form-control"
                  placeholder="Search..."
                  v-model="state.newSearch"
                  >
                </div>
          <div v-if="state.newSearch">
            <router-link :to="{name: 'SearchResults', params: {query: state.newSearch}}" @click="getAll" tag="button" type ="submit" class="text-light text-uppercase">
              <button class="btn btn-primary">Search</button>
            </router-link>
          </div>
      </form>
  </nav>
    <UpdateProfileModal/>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { profilesService } from '../services/ProfilesService'
import { announcementsService } from '../services/AnnouncementsService'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { computed, reactive } from 'vue'


export default {
  setup() {
    const state = reactive({
      dropOpen: false,
      newSearch: ''
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      async getAll(){
      try {
        await profilesService.getAll(state.newSearch)
      } catch (error) {
        Pop.toast(error, 'error')
      }
      try {
          await announcementsService.getByQuery('api/posts?query=', state.newSearch)
        } catch (error) {
          Pop.toast(error, 'error')
        }
    },
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
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--light);
}
</style>
