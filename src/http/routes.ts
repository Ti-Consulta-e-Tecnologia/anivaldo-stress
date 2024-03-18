import { FastifyInstance } from 'fastify'
import { hello } from './controllers/hello'
import { token } from './token'

export async function appRoutes(app: FastifyInstance) {
  app.post('/', hello)

  app.get('/token', token)
}
