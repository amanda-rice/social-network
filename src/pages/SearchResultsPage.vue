<template>
  <div class="home">
    <div class="row">
      <div class="col-2 sidebar-height sml-hdn">
        <SideBar/>
      </div>
      <div class="col-md-10">
        <div class="row">
          <div class="col-12">
            <Navbar/>
          </div>
        <div class="col-md-10">
          <h1 v-if="profiles.length > 0" class="text-left mt-3">Profiles</h1>
          <ProfileSearchCard v-for="p in profiles" :key="p.id" :profile="p"/>
          <h1 v-if="announcements.length > 0" class="text-left mt-3">Posts</h1>
          <AnnouncementThread :announcements="announcements"/>
          <div v-if="previous!== null">
            <button @click="previousPage">Previous</button>
          </div>
          <div v-if="next!== null">
            <button @click="nextPage">Next</button>
          </div>
        </div>
        <div class="col-2 sml-hdn">
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
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'



export default {
  name: 'SearchResultsPage',
  setup(){
    const router = useRoute()
    // onMounted(async () => {
    //   try {
    //     await profilesService.getAll(router.params.query)
    //   } catch (error) {
    //     Pop.toast(error, 'error')
    //   }
    // })
    // onMounted(async () => {
    //   try {
    //     await announcementsService.getByQuery('api/posts?query=', router.params.query)
    //   } catch (error) {
    //     Pop.toast(error, 'error')
    //   }
    // })
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
      profiles: computed(() => AppState.profiles),
      thisQuery: computed(()=> router.params.query),
      async nextPage(){
        try {
          await announcementsService.getAll(AppState.next)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async previousPage(){
        try {
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

@media only screen and (max-width: 768px) {
  .sml-hdn {
    display: none;
  }
}
.sidebar-height{
  height:100vh;
}
</style>

