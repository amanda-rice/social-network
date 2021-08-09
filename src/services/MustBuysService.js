import { AppState } from '../AppState'
import { api } from './AxiosService'

class MustBuysService {
  async getAll() {
    const res = await api.get('api/ads')
    AppState.mustBuys = res.data
  }
}

export const mustBuysService = new MustBuysService()
