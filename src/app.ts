import fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './http/routes'
import { errorHandler } from './error-handler'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: { cookieName: 'refreshToken', signed: false },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(appRoutes)

app.setErrorHandler(errorHandler)
