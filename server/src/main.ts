import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'

import { connectToDatabase, disconnectFromDatabase } from './utils/database'
import logger from './utils/logger'
import { CORS_ORIGIN } from './utils/constants'
import userRoutes from './modules/user/user.route'
import authRoutes from './modules/auth/auth.route'
import videoRoutes from './modules/videos/video.route'
import deserializeUser from './middleware/deserializeUser'

const PORT = process.env.PORT || 4000

const app = express()

//Setting up middlewares

app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
)
app.use(helmet())
app.use(deserializeUser)

//Registering the routes

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/videos', videoRoutes)

//Bootstrap the server

const server = app.listen(PORT, async () => {
  await connectToDatabase()
  logger.info(`Server Listening on port ${PORT}`)
})

const signals = ['SIGTERM', 'SIGINT']
function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    server.close()
    await disconnectFromDatabase()
    logger.info('Gracefully shut down')

    process.exit(0)
  })
}
for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i])
}
