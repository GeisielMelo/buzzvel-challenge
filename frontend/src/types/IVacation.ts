/** Reference for managing data within the components. */
export type IVacation = {
  _id: string
  title: string
  description: string
  location: string
  participants?: string[]
  scheduledAt?: Date
  createdAt?: Date
  updatedAt?: Date
}