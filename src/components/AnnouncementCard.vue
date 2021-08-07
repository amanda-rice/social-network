<template>
  <div class="col-12 my-3 bg-light shadow">
    <router-link router-link :to="{ name: 'Profile', params: {id: announcement.creator.id } }"  class="creator p-3 align-self-end">
      <h1>{{announcement.creator.name}}</h1>
      </router-link>
    <div v-if="announcement.imgUrl">
      <img :src="announcement.imgUrl" :alt="announcement.creator.name"
      class="w-100">
    </div>
    <p>{{ announcement.body }}</p>
    <div class="d-flex">
      <div class="align-self-end" v-if="account.id === announcement.creatorId">
        <button class="btn btn-danger" @click.stop="destroy">
          delete
        </button>
      </div>
      <p>{{announcement.likes.length}}</p>
      <h1 class="p-0 m-0" @click="addLike">♡</h1>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { announcementsService } from '../services/AnnouncementsService'
export default {
  props: {
    announcement: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await announcementsService.destroy(props.announcement.id)
            Pop.toast('Deleted', 'success')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async addLike(){
        try {
          await announcementsService.addLike(props.announcement.id)
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