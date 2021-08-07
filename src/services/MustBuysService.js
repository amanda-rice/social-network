import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class MustBuysService {
  async getAll() {
    const res = await api.get('api/ads')
    AppState.mustBuys = res.data
  }
}

export const mustBuysService = new MustBuysService()
