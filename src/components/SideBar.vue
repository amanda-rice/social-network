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
      <div v-else class="d-flex flex-column text-center">
        <div class="d-flex flex-column align-items-center pt-5">

          <img
          :src="account.picture"
          alt="account.name"
          height="200"
          width="200"
          class = "circle-image"
          />
              </div>
              <div class="d-flex justify-content-start flex-column text-left ">
                <p class="p-0 m-0">{{account.class}}</p>
                <div class="dropdown selectable p-0 m-0">
                  <div
                  class="dropdown-toggle"
                  @click="state.dropOpen = !state.dropOpen"
                  >
                  <span class="large-name overflow-hidden">{{ account.name }}</span>
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
      </div> 
      <div class="d-flex text-left">
          <img
          alt="linkedIn logo"
          src="../assets/img/linkedin.png"
          height="25"
          width="25"
          /><p> {{account.linkedin}}</p>  
        </div>
        <div class="d-flex text-left">
          <img
          alt="GitHub logo"
          src="../assets/img/github.png"
          height="25"
          width="25"
          /><p> {{account.github}}</p>  
        </div>
        <p>Resume</p>

    <div class="pr-5 action" data-toggle="modal" data-target="#create-account">
        <span>Update Profile</span>
      </div>
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
                     placeholder="Name..."
                     v-model="state.updatedAccount.name"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="email">Email</label>
              <input type="text"
                     id="email"
                     class="form-control"
                     placeholder="Email..."
                     v-model="state.updatedAccount.email"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="picture">Profile Picture</label>
              <input type="text"
                     id="picture"
                     class="form-control"
                     placeholder="Add link to profile picture..."
                     v-model="state.updatedAccount.picture"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="coverImg">Cover Image</label>
              <input type="text"
                     id="coverImg"
                     class="form-control"
                     placeholder="Add link for your cover image..."
                     v-model="state.updatedAccount.coverImg"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="bio">Bio</label>
              <input type="text"
                     id="bio"
                     class="form-control"
                     placeholder="Bio..."
                     v-model="state.updatedAccount.bio"
              >
            </div>
             <div class="form-group">
              <label class="pr-2" for="github">GitHub</label>
              <input type="text"
                     id="github"
                     class="form-control"
                     placeholder="GitHub..."
                     v-model="state.updatedAccount.github"
              >
            </div>
             <div class="form-group">
              <label class="pr-2" for="linkedin">LinkedIn</label>
              <input type="text"
                     id="linkedin"
                     class="form-control"
                     placeholder="LinkedIn..."
                     v-model="state.updatedAccount.linkedin"
              >
            </div>
             <div class="form-group">
              <label class="pr-2" for="resume">Resume</label>
              <input type="text"
                     id="resume"
                     class="form-control"
                     placeholder="Resume..."
                     v-model="state.updatedAccount.resume"
              >
            </div>
             <div class="form-group">
              <label class="pr-2" for="class">Class</label>
              <input type="text"
                     id="class"
                     class="form-control"
                     placeholder="Class..."
                     v-model="state.updatedAccount.class"
              >
            </div>
             <div class="form-group">
              <label class="pr-2" for="graduated">Graduated?</label>
              <input type="boolean"
                     id="graduated"
                     class="form-control"
                     placeholder="Graduated?"
                     v-model="state.updatedAccount.graduated"
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
.large-name{
  font-size: 30px;
  font-weight: 600;
}
.selectable{
  cursor: pointer;
}
.circle-image{
  border-radius: 50%;
  object-fit: cover;
}
</style>