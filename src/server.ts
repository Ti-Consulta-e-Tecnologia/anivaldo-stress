import { app } from './app'
import { env } from './env'

const host = env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'

app
  .listen({
    host,
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP server listening on ${env.PORT}`)
  })
