<template>
  <div class="col-12 my-3 bg-light shadow">
    <div class="p-3">
      <div class="d-flex text-left">
        <router-link router-link :to="{ name: 'Profile', params: {id: announcement.creator.id } }"  class="">
            <img :src="announcement.creator.picture" :alt="announcement.creator.name" class="small-prof-pic mr-2">
          </router-link>
          <p class="d-flex flex-column">
            <p class="p-0 m-0 overflow-hidden"><b>{{announcement.creator.name}}</b></p>
            <p class="minor-text p-0 m-0"> {{cleanDate}}</p>
          </p>
      </div>
      <div v-if="announcement.imgUrl">
        <img :src="announcement.imgUrl" :alt="announcement.creator.name"
        class="w-100">
    </div>
    <p class="overflow-hidden text-left py-2">{{ announcement.body }}</p>
    <div class="d-flex">
      <div class="align-self-end" v-if="account.id === announcement.creatorId">
        <button class="btn btn-danger" @click.stop="destroy">
          delete
        </button>
      </div>
      <div class="ml-auto d-flex align-items-end">
        <h1 v-if="!user.isAuthenticated" class="pr-2 m-0">♡</h1>
        <h1 v-else class="pr-2 m-0 hoverable" @click="addLike">♡</h1>
        <h5 class="d-flex minor-text">{{announcement.likes.length}}</h5>
      </div>
    </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { announcementsService } from '../services/AnnouncementsService'
import * as timeago from 'timeago.js'

export default {
  props: {
    announcement: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      cleanDate: timeago.format(props.announcement.createdAt),
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
.small-prof-pic{
  height: 30px;
  width: 30px;
  border-radius: 50%;
  object-fit: cover;
}
</style>