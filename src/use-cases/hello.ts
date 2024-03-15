import { HelloError } from './errors/hello-error'

interface HelloUseCaseRequest {
  type: string
}

export class HelloUseCase {
  async execute({ type }: HelloUseCaseRequest) {
    if (type === 'error') {
      throw new HelloError()
    }

    return {
      hello: 'hello',
    }
  }
}
