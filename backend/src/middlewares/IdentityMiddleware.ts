import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const pattern = /^[0-9a-fA-F]{24}$/

  if (!id) return res.status(400).json({ message: 'Invalid id request' })
  if (!pattern.test(id)) return res.status(500).json({ message: 'Internal server error' })

  req.id = id
  return next()
}
