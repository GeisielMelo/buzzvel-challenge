import VacationError from 'app/Vacation/exceptions/VacationError'
import VacationService from 'app/Vacation/services/VacationService'
import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  const { title, description, location, participants, scheduledAt } = req.body
  try {
    VacationService.validateData(req.body)
    VacationService.validateTitle(title)
    VacationService.validateDescription(description)
    VacationService.validateLocation(location)
    VacationService.validateParticipants(participants)
    VacationService.validateScheduledAt(scheduledAt)
    return next()
  } catch (error) {
    if (error instanceof VacationError) res.status(400).json({ message: error.message })
    res.status(400).json({ message: 'Internal server error' })
  }
}
