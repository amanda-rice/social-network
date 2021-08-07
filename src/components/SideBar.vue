<template>
  <div class="component">
    <span class="navbar-text">
      <button
        class="btn btn-outline-primary text-uppercase"
        @click="login"
        v-if="!user.isAuthenticated"
      >
        Login
      </button>
      <div v-else class="d-flex flex-column text-center align-items-center">
        <img
              :src="user.picture"
              alt="user photo"
              height="100"
              width="100"
              class="rounded"
        />
        <div class="dropdown">
          <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
          >
            <span class="mx-3">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Account
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div> 
        <p>{{user.bio}}</p> 
        <div>
          <img
          alt="logo"
          src="../assets/img/linkedin.png"
          height="25"
          width="25"
          /><p> {{user.linkedin}}</p>  
        </div>
      <p>Resume {{user.resume}}</p>>
      <p>{{user}}</p>
    </div>
    <div class="pr-5 action" data-toggle="modal" data-target="#create-account">
        <span>Update Profile</span>
      </div>
    </span>
  </div>
   <div class="modal fade"
       id="create-account"
       tabindex="-1"
       role="dialog"
       aria-labelledby="create-account"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            New Account
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateAccount">
            <div class="form-group">
              <label class="pr-2" for="name">Name</label>
              <input type="text"
                     id="name"
                     class="form-control"
                     required
                     placeholder="Name..."
                     v-model="state.updatedAccount.name"
              >
            </div>
            <div>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
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
</style>