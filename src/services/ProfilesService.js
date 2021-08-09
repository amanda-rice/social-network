import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  async getAll(query) {
    const res = await api.get('api/profiles?query=' + query)
    AppState.profiles = res.data
  }

  async getById(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.profile = res.data
  }
}
export const profilesService = new ProfilesService()
