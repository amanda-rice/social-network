import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class AnnouncementsService {
  async getAll(query = {}) {
    const res = await api.get('api/posts' + convertToQuery(query))
    logger.log(res.data)
    AppState.announcements = res.data.posts
  }

  async createAnnouncement(announcement) {
    const res = await api.post('api/posts', announcement)
    await this.getAll()
  }

  async destroy(id) {
    await api.delete('api/posts/' + id)
    AppState.announcements = AppState.announcements.filter(a => a.id !== id)
  }
}

export const announcementsService = new AnnouncementsService()
