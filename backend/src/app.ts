import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import routes from './routes'
import corsOptions from './config/cors'
import mongoService from './database'

export default class App {
  app: Application

  constructor() {
    this.app = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`\x1b[32m[server] Server started on port \x1b[33m${port}\x1b[32m!\x1b[0m`)
    })
  }

  private database() {
    mongoService.getInstance()
  }

  private middlewares() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors(corsOptions))
  }

  private routes() {
    this.app.use(routes)
  }

  private exceptionHandler() {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.message)
      next()
    })
  }
}
