<template>
  <div class="col-12 my-3 bg-light shadow">
    <h3>{{ announcement.creator.name }}</h3>
    <p>{{ announcement.body }}</p>
    <p>This is the announcement card</p>
    <div class="align-self-end" v-if="account.id === announcement.creatorId">
        <button class="btn btn-danger" @click.stop="destroy">
          delete
        </button>
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
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>