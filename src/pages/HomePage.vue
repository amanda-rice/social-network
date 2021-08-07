<template>
  <div class="home">
    <div class="row">
      <div class="col-2 sidebar-height">
        <SideBar/>
      </div>
      <div class="col-10">
        <div class="row">
          <div class="col-12">
            <Navbar/>
        </div>
        <div class="col-8">
          <div v-if="account.id">
            <AnnouncementCreation/>
          </div>
          <AnnouncementThread :announcements="announcements"/>
          <div v-if="previous!== null">
            <button @click="previousPage">Previous</button>
          </div>
          <div v-if="next!== null">
            <button @click="nextPage">Next</button>
          </div>
        </div>
        <div class="col-2">
          <aside class="ml-3 mr-1 my-3">
            <div class="row">
              <MustBuyDisplay v-for="m in mustBuys" :key="m.id" :mustBuy="m"/>
            </div>
          </aside>
          
        </div>
        
      </div>
      </div>
      </div>
    </div>
  </template>
  
  <script>
    import { computed, onMounted } from '@vue/runtime-core'
    import { AppState } from '../AppState'
  import Pop from '../utils/Notifier'
  import {announcementsService} from '../services/AnnouncementsService'
import {mustBuysService} from '../services/MustBuysService'




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
    onMounted(async () => {
      try {
        await mustBuysService.getAll()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return{
      previous: computed(()=> AppState.previous),
      next: computed(()=> AppState.next),
      announcements: computed(()=> AppState.announcements),
      mustBuys: computed(()=> AppState.mustBuys),
      account: computed(() => AppState.account),
      async nextPage(){
        try {
          console.log(this.announcements, "announcements")
          await announcementsService.getAll(AppState.next)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async previousPage(){
        try {
          console.log(this.previous, "previous")
          await announcementsService.getAll(AppState.previous)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
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
.sidebar-height{
  height:100vh;
}
</style>

