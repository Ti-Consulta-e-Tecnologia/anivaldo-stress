import { beforeEach, describe, expect, it } from 'vitest'
import { HelloUseCase } from './hello'
import { HelloError } from './errors/hello-error'

let sut: HelloUseCase

describe('Hello Use case', () => {
  beforeEach(() => {
    sut = new HelloUseCase()
  })

  it('should be return a hello ', async () => {
    const { hello } = await sut.execute({
      type: 'ok',
    })

    expect(hello).toEqual(expect.any(String))
  })

  it('should throw a error', async () => {
    await expect(() => sut.execute({ type: 'error' })).rejects.toBeInstanceOf(
      HelloError,
    )
  })
})
