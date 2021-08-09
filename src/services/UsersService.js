import { AppState } from '../AppState'
import { api } from './AxiosService'

class UsersService {
  async updateAccount(obj) {
    const res = await api.put('/account/', obj)
    AppState.account = res.data
  }
}

export const usersService = new UsersService()
