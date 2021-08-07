import { AppState } from '../AppState'
import { api } from './AxiosService'

class ProfilesService {
  async getAll(url = 'api/profiles?query=', query) {
    console.log(url + query)
    const res = await api.get(url + query)
    console.log(res.data)
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
