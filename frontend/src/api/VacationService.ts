import { IVacation } from '../types/IVacation'
import axios, { AxiosInstance } from 'axios'

/** Service for handling connections with the backend to perform CRUD operations. */
class VacationService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({ baseURL: import.meta.env.VITE_AXIOS_BASE_URL })
  }

  /** Retrieves all documents from the database. */
  async find() {
    return this.api.get('/api/vacation')
  }

  /** Fetches the specified document from the database.
   *  @param id - Document _id
   */
  async findOne(id: string) {
    return this.api.get(`/api/vacation/${id}`)
  }

  /** Creates a new vacation in the backend.
   * @param data - The data of the vacation to create.
   */
  async create(data: IVacation) {
    return this.api.post('/api/vacation', data)
  }

  /** Locate the vacation by its ID and update it using the current data.
   * @param id - Document _id
   */
  async findAndUpdate(id: string, data: IVacation) {
    return this.api.put(`/api/vacation/${id}`, data)
  }

  /** Find the vacation by its ID and delete it.
   *  @param id - Document _id
   */
  async findAndDelete(id: string) {
    return this.api.delete(`/api/vacation/${id}`)
  }
}

export default new VacationService()
