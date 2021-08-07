<template>
  <div class="component row">
    <div class="col-12">
      <form @submit.prevent="createAnnouncement">
        <div class="form-group">
          <label class="pr-2" for="imgUrl">Image URL</label>
          <input type="text"
                  id="imgUrl"
                  class="form-control"
                  placeholder="Image URL..."
                  v-model="state.newAnnouncement.imgUrl"
                  >
                </div>
                <div class="form-group">
          <label class="pr-2" for="body">Body</label>
          <textarea type="text"
                  id="body"
                  class="form-control"
                  placeholder="Body..."
                  required
                  v-model="state.newAnnouncement.body"
          ></textarea>
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