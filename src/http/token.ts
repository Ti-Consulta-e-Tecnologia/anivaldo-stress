import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function token(request: FastifyRequest, reply: FastifyReply) {
  const startTime = performance.now()
  const querySchema = z.object({
    token: z.string(),
  })

  const { token } = querySchema.parse(request.query)

  const data = await prisma.tb_event.findFirst({
    where: {
      token,
    },
  })

  const endTime = performance.now()
  const elapsedTime = endTime - startTime
  const tempoEmSegundos = elapsedTime / 1000

  reply.status(200).send({ tempoEmSegundos, data })
}
