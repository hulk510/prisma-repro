import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@repo/db'
import NextAuth, {
  type NextAuthConfig,
  type NextAuthResult,
} from 'next-auth'
import 'next-auth/jwt'
import type { Provider } from 'next-auth/providers'
import Credentials from 'next-auth/providers/credentials'

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: { label: 'Password', type: 'password' },
    },
  }),
]

const authConfig: NextAuthConfig = {
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: 'jwt', // Credentials ProviderはJWT戦略を使う
  },
  callbacks: {},
}

const nextAuth = NextAuth(authConfig)

// https://github.com/nextauthjs/next-auth/issues/10568
const signIn: NextAuthResult['signIn'] = nextAuth.signIn
const auth: NextAuthResult['auth'] = nextAuth.auth
const handlers: NextAuthResult['handlers'] = nextAuth.handlers
const signOut: NextAuthResult['signOut'] = nextAuth.signOut
const update: NextAuthResult['unstable_update'] =
  nextAuth.unstable_update

// Server actions
export { auth, handlers, signIn, signOut, update }
