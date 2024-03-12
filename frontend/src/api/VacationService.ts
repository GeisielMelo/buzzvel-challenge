import { IVacation } from '../types/IVacation'
import axios, { AxiosInstance } from 'axios'

class VacationService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({ baseURL: import.meta.env.VITE_AXIOS_BASE_URL })
  }

  async find() {
    return this.api.get('/api/vacation')
  }

  async findOne(id: IVacation) {
    return this.api.get(`/api/vacation/${id}`)
  }

  async create(data: IVacation) {
    return this.api.post('/api/vacation', data)
  }

  async findAndUpdate(id: string, data: IVacation) {
    return this.api.put(`/api/vacation/${id}`, data)
  }

  async findAndDelete(id: string) {
    return this.api.delete(`/api/vacation/${id}`)
  }
}

export default new VacationService()
