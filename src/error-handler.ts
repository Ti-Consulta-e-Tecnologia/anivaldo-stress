import { FastifyError, FastifyReply } from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'

export async function errorHandler(
  error: FastifyError,
  _: any,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO Here we should logo to an extrernal tool like Datadog/NwRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error' })
}
