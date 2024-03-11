import dotenv from 'dotenv'

dotenv.config()

export default {
  nodeEnv: (process.env.NODE_ENV as 'development' | 'production') || 'production',
  port: Number(process.env.PORT) || 3000,
  database: {
    mongo: {
      uri: process.env.MONGODB_URI,
    },
  },
}
