import VacationError from '../exceptions/VacationError'
import Vacation from '../../../database/models/Vacation'

class ValidateUserInput {
  validateData(data: object) {
    for (const key of Object.keys(data)) {
      if (!(key in Vacation.schema.paths)) {
        throw new VacationError(`Key: '${key}' is now allowed.`)
      }
    }
  }

  validateTitle(title: string) {
    if (!title) throw new VacationError('Title is required')
    if (title.length < 3) throw new VacationError('Title must be at least 3 characters')
    if (title.length > 50) throw new VacationError('Title must be at most 50 characters')
  }

  validateDescription(description: string) {
    if (!description) throw new VacationError('Description is required')
    if (description.length < 10)
      throw new VacationError('Description must be at least 10 characters')
    if (description.length > 500)
      throw new VacationError('Description must be at most 500 characters')
  }

  validateLocation(location: string) {
    if (!location) throw new VacationError('Location is required')
    if (location.length < 3) throw new VacationError('Location must be at least 3 characters')
    if (location.length > 50) throw new VacationError('Location must be at most 50 characters')
  }

  validateParticipants(participants: string[]) {
    if (!participants) return
    if (!Array.isArray(participants)) throw new VacationError('Participants must be an array')
    if (participants.length < 1) throw new VacationError('Participants must have at least 1 member')
  }

  validateScheduledAt(scheduledAt: Date) {
    if (!scheduledAt) return
    if (scheduledAt < new Date()) throw new VacationError('Vacation must be in the future')
  }
}

export default new ValidateUserInput()
