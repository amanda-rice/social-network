import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  async getAll(query) {
    console.log('api/profiles?query=' + query)
    const res = await api.get('api/profiles?query=' + query)
    console.log(res, 'profiles by query')
    AppState.profiles = res.data
  }

  async getById(id) {
    const res = await api.get('api/profiles/' + id)
    console.log(res.data)
    AppState.profile = res.data
    console.log(AppState.profile)
  }
}
export const profilesService = new ProfilesService()
