import { AppState } from '../AppState'
import { api } from './AxiosService'

class UsersService {
  async updateAccount(obj) {
    const res = await api.put('/account/', obj)
  }
}

export const usersService = new UsersService()
