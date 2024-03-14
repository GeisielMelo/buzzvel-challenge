import { Request, Response } from 'express'
import VacationError from '../exceptions/VacationError'
import Vacation from '../../../database/models/Vacation'

class VacationController {
  async show(req: Request, res: Response) {
    try {
      const vacation = await Vacation.findById(req.id)
      if (!vacation) throw new VacationError('Vacation not found.')
      return res.status(200).json(vacation)
    } catch (error) {
      if (error instanceof VacationError) {
        return res.status(400).json({ message: error.message })
      }
      return res.status(400).json({ message: 'Internal server error.' })
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const vacations = await Vacation.find()
      return res.status(200).json(vacations)
    } catch (error) {
      if (error instanceof VacationError) {
        return res.status(400).json({ message: error.message })
      }
      return res.status(400).json({ message: 'Internal server error.' })
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const vacation = await Vacation.create(req.body)
      if (!vacation) throw new VacationError('Fail on vacation creation.')
      return res.status(201).json(vacation)
    } catch (error) {
      if (error instanceof VacationError) {
        return res.status(400).json({ message: error.message })
      }
      return res.status(400).json({ message: 'Internal server error.' })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const vacation = await Vacation.findByIdAndUpdate(req.id, req.body, { new: true })
      if (!vacation) throw new VacationError('Vacation not found.')
      return res.status(200).json(vacation)
    } catch (error) {
      if (error instanceof VacationError) {
        return res.status(400).json({ message: error.message })
      }
      return res.status(400).json({ message: 'Internal server error.' })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const vacation = await Vacation.findByIdAndDelete(req.id)
      if (!vacation) throw new VacationError('Vacation not found.')
      return res.status(200).json({ message: `Vacation: ${vacation.title} deleted.` })
    } catch (error) {
      if (error instanceof VacationError) {
        return res.status(400).json({ message: error.message })
      }
      return res.status(400).json({ message: 'Internal server error.' })
    }
  }
}

export default new VacationController()
