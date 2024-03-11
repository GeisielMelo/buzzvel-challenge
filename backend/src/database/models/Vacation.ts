import { Schema, Document, model } from 'mongoose'

export interface IVacation {
  title: string
  description: string
  location: string
  participants: string[]
  scheduledAt: Date
}

export interface IVacationDocument extends IVacation, Document {}

const vacationSchema = new Schema<IVacationDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    participants: { type: [String] },
    scheduledAt: { type: Date },
  },
  {
    timestamps: true,
  },
)

const Vacation = model<IVacationDocument>('Vacation', vacationSchema)
export default Vacation
