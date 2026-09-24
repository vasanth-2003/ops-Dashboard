const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Missing required environment variable: MONGODB_URI')
}

export const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI,
}
