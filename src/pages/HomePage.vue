<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <AnnouncementThread :announcements="announcements"/>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import {announcementsService} from '../services/AnnouncementsService'




export default {
  name: 'Home',
  setup(){
    onMounted(async () => {
      try {
        await announcementsService.getAll()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return{
      announcements: computed(()=> AppState.announcements)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
