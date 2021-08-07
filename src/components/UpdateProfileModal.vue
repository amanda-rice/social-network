<template>
  <div class="component">
<div class="modal fade"
       :id="'user-modal-'+user.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="update-user"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Update Profile
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateUser">
            <div class="form-group">
              <label class="pr-2" for="name">Title</label>
              <input type="text"
                     id="name"
                     class="form-control"
                     placeholder="Name..."
                     v-model="state.updatedUser.name"
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

  </div>
</template>


<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import Pop from '../utils/Notifier'
import { usersService } from '../services/UsersService'
import $ from 'jquery'

export default {
  name: 'component',
  setup(){
    const state = reactive({
      updatedUser:{}
    })
    return {
      user: computed(() => AppState.user),
      async updateUser() {
        try {
          await usersService.updateUser(state.updateUser)
          $('#update-user').modal('hide')
          Pop.toast('Updated!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
<!-- 
            <div class="form-group">
              <label class="pr-2" for="picture">Profile Picture</label>
              <input type="text"
                     id="picture"
                     class="form-control"
                     placeholder="Profile Picture URL..."
                     v-model="state.updateUser.picture"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="bio">Bio</label>
              <textarea type="text"
                        id="bio"
                        class="form-control"
                        placeholder="Bio..."
                        v-model="state.updateUser.bio"
              ></textarea>
            </div>
             -->