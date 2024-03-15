import { FastifyInstance } from 'fastify'
import { hello } from './controllers/hello'

export async function appRoutes(app: FastifyInstance) {
  app.post('/', hello)
}
