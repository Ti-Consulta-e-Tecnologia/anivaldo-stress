import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { hello } from './controllers/hello'
import { token } from './token'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

export async function appRoutes(app: FastifyInstance) {
  app.post('/', hello)

  app.get('/token', token)

  app.get('/stress', async (request: FastifyRequest, reply: FastifyReply) => {
    const zonas = [
      'fundo2',
      'patio2',
      'corredor2',
      'saida2',
      'entrada2',
      'cozinha2',
      'quarto2',
      'sala2',
      'garagem2',
      'quintal2',
    ]
    const cnpjs = [
      '07112869000177x',
      '07112869000178x',
      '19456231000145x',
      '3956234000188x',
      '9999999000199x',
      '4675892142197',
      '127812547812749821',
      '126784124794214',
      '12784215847921',
      '12782164782167',
    ]
    const nomes = [
      'nome fantasiado',
      'qualquer um',
      'teste',
      'empresa fantasminha',
      'inexistente',
      'criacao',
      'fantasma',
      'faturador',
    ]

    const criacao = await prisma.tb_event.create({
      data: {
        channel_id: 'CAM3-SS-ELE-ESQ',
        channel_name: 'CAM3-SS-ELE-ESQ',
        event_name: 'Crossed line',
        event_origin: 'ELEVADORES SS ESQ',
        event_time: new Date().toISOString(),
        event_type: 'TripwireCrossed',
        rule_id: randomUUID(),
        rule_name: 'Enter',
        is_send_api: 'false',
        is_send_csv: 'true',
        velocity: 600,
        position_x: 700,
        position_y: 800,
        objet_id: 50,
        token: randomUUID(),
        cnpj: cnpjs[Math.floor(Math.random() * cnpjs.length)],
        nome_matriz: 'NOME FANTASMA PARA TESTE DE STRESS',
        filial: nomes[Math.floor(Math.random() * nomes.length)],
        zona: zonas[Math.floor(Math.random() * zonas.length)],
      },
    })

    reply.status(200).send({ criacao })
  })

  app.get(
    '/cnpj/:cnpj',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { cnpj } = request.params as any

      const datas = await prisma.tb_event.findMany({
        where: {
          cnpj,
        },
      })

      reply.status(200).send({ datas })
    },
  )

  app.get(
    '/filial/:filial',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { filial } = request.params as any

      const datas = await prisma.tb_event.findMany({
        where: {
          filial,
        },
      })

      reply.status(200).send({ datas })
    },
  )

  app.get(
    '/zona/:zona',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { zona } = request.params as any

      const datas = await prisma.tb_event.findMany({
        where: {
          zona,
        },
      })

      reply.status(200).send({ datas })
    },
  )

  app.get('/contagem', async (request: FastifyRequest, reply: FastifyReply) => {
    const count = await prisma.tb_event.count()

    reply.status(200).send({ count })
  })
}
