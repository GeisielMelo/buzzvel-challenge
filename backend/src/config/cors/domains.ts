import config from '../../config'

const { nodeEnv } = config

const development = [
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
]

const production = ['https://buzzvel-challenge-client.vercel.app']

const domains = nodeEnv === 'development' ? development : production

export default domains
