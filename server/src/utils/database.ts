import mongoose from 'mongoose'
import logger from './logger'

const DB_CONNECTION_STRING =
  process.env.CONNECTION_URL ||
  'mongodb+srv://aditya:Dravid@cluster0.rdbqg.mongodb.net/ytClone?retryWrites=true&w=majority'

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING)
    logger.info('connected to database')
  } catch (error) {
    logger.error(error, 'Failed to connect to DB.')
    process.exit(1)
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close()
  logger.info('Disconnected from DB')
}
