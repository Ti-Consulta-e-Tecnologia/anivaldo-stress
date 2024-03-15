import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { HelloUseCase } from '../../use-cases/hello'

export async function hello(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    type: z.string(),
  })

  const { type } = bodySchema.parse(request.body)

  const helloUseCase = new HelloUseCase()

  const hello = await helloUseCase.execute({ type })

  return reply.status(200).send({ hello })
}
