import { Router } from 'express'
import vacation from '../Vacation/controllers/VacationController'
import IdentityMiddleware from 'middlewares/IdentityMiddleware'
import InputMiddleware from 'middlewares/InputMiddleware'

const routes = Router()

routes.get('/api/vacation', vacation.index)
routes.get('/api/vacation/:id', IdentityMiddleware, vacation.show)
routes.post('/api/vacation', InputMiddleware, vacation.create)
routes.put('/api/vacation/:id', IdentityMiddleware, InputMiddleware, vacation.update)
routes.delete('/api/vacation/:id', IdentityMiddleware, vacation.delete)

export default routes
