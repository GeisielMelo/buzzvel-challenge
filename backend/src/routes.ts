import { Router } from 'express'
import vacationRoutes from './app/Vacation/routes'

const routes = Router()

routes.use(vacationRoutes)

export default routes
