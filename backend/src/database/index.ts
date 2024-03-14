/* eslint-disable no-useless-catch */
import mongoose from 'mongoose'
import config from '../config'

type MongooseConnection = {
  db: mongoose.Connection
  client: mongoose.Mongoose
}

const mongoService = (function () {
  let connectionInstance: MongooseConnection | null = null

  async function getInstance(): Promise<MongooseConnection> {
    if (connectionInstance) {
      return connectionInstance
    }

    try {
      const { uri } = config.database.mongo
      const client: mongoose.Mongoose = await mongoose.connect(uri as string)

      const db: mongoose.Connection = mongoose.connection
      connectionInstance = { db, client }

      return connectionInstance
    } catch (err) {
      throw err
    }
  }

  function getDb(): mongoose.Connection {
    if (!connectionInstance || !connectionInstance.db) {
      throw new Error('DB connection is not initialized')
    }

    return connectionInstance.db
  }

  return {
    getInstance,
    getDb,
  }
})()

export default mongoService
