import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import { WebSocket } from 'ws'

if (process.env.NODE_ENV === 'production') {
  neonConfig.webSocketConstructor = WebSocket
  neonConfig.poolQueryViaFetch = true
} else {
  neonConfig.wsProxy = (host) => `${host}:54330/v1`
  neonConfig.useSecureWebSocket = false
  neonConfig.pipelineTLS = false
  neonConfig.pipelineConnect = false
}

const connectString = `${process.env.DATABASE_URL}`
const neon = new Pool({
  connectionString: connectString,
})
const adapter = new PrismaNeon(neon)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient
}

export const prisma = new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma
