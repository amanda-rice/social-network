import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class AnnouncementsService {
  async getAll(url = 'api/posts', query = {}) {
    console.log(query)
    const res = await api.get(url + convertToQuery(query))
    logger.log(res.data)
    AppState.announcements = res.data.posts
    AppState.previous = res.data.newer
    AppState.next = res.data.older
  }

  async createAnnouncement(announcement) {
    const res = await api.post('api/posts', announcement)
    logger.log(res, 'create announcement')
    await this.getAll()
  }

  async addLike(id) {
    const res = await api.post('api/posts/' + id + '/like')
    const currentAnnouncement = AppState.announcements.findIndex(a => a.id === id)
    AppState.announcements.splice(currentAnnouncement, 1, res.data)
  }

  async destroy(id) {
    await api.delete('api/posts/' + id)
    AppState.announcements = AppState.announcements.filter(a => a.id !== id)
  }
}

export const announcementsService = new AnnouncementsService()
