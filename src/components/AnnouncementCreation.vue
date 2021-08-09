<template>
  <div class="component row p-3">
    <div class="col-12  my-3 py-4 bg-light">
      <form @submit.prevent="createAnnouncement">
        <div class="form-group">
          <textarea type="text"
                  id="body"
                  class="form-control border-dashed"
                  placeholder="Share what's happening..."
                  required
                  maxlength ="500"
                  v-model="state.newAnnouncement.body"
          ></textarea>
          <input type="text"
                  id="imgUrl"
                  class="form-control border-dashed mt-4"
                  placeholder="Add a picture URL..."
                  v-model="state.newAnnouncement.imgUrl"
                  maxlength = "150"
                  >
                </div>
                <div class="form-group">
        </div>
        <div>
          <button type="submit" class="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
    </div>
  </template>
  
  
  <script>
    import { AuthService } from '../services/AuthService'
    import { AppState } from '../AppState'
    import { computed, reactive } from 'vue'
import Pop from '../utils/Notifier'
import { announcementsService } from '../services/AnnouncementsService'
import $ from 'jquery'

export default {
  setup(){
    const state = reactive({
      newAnnouncement: {}
    })
    return {
      state,
      user: computed(()=> AppState.user),
      async createAnnouncement(){
        try {
          await announcementsService.createAnnouncement(state.newAnnouncement)
          state.newAnnouncement = {}
          Pop.toast('Created!', 'success')
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