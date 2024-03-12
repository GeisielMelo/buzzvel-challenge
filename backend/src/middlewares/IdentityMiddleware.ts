import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const pattern = /^[0-9a-fA-F]{24}$/

  if (!id) return res.status(400).json({ message: 'Invalid id' })
  if (!pattern.test(id)) return res.status(404).json({ message: 'Invalid id' })

  req.id = id
  return next()
}
