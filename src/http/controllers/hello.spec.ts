import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Hello (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to send a hello', async () => {
    const response = await request(app.server).post('/').send({
      type: 'ok',
    })

    expect(response.statusCode).toEqual(200)
  })
})
