import fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './http/routes'
import { errorHandler } from './error-handler'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import { prisma } from './lib/prisma'
import { randomUUID } from 'crypto'

const QUANTIDADE = env.QUANTIDADE

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

async function stressTest() {
  console.time('create')
  for (let index = 0; index < QUANTIDADE; index++) {
    await prisma.tb_event.create({
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
        cnpj: '07115869000178',
        nome_matriz: 'NOME FANTASMA PARA TESTE DE STRESS',
        filial: 'NOME ALEATÓRIO DE FILIAL PARA TESTE DE STRESS',
      },
    })
  }
  console.timeEnd('create')
  console.time('count')
  console.log('Quantidade de registros: ', await prisma.tb_event.count())
  console.timeEnd('count')
}

app.register(fastifyCookie)

app.register(appRoutes)

app.setErrorHandler(errorHandler)

// app.ready(async () => {
//   try {
//     await stressTest()
//     setInterval(stressTest, 1000)
//   } catch (error) {
//     console.error('Error during stress test: ', error)
//     process.exit(1)
//   }
// })
