import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@repo/db'
import { signInSchema } from '@repo/schema/auth'
import { comparePasswords } from '@repo/utils/password'
import * as Sentry from '@sentry/nextjs'
import NextAuth, {
  type NextAuthConfig,
  type NextAuthResult,
} from 'next-auth'
import 'next-auth/jwt'
import type { Provider } from 'next-auth/providers'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { ZodError } from 'zod'

// next-authの型拡張用の定義
// https://authjs.dev/getting-started/typescript#resources

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id?: string
  }
}

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {}
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {}
}

async function getUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || !user.hashedPassword) {
    return null
  }
  const isCorrectPassword = await comparePasswords(
    password,
    user.hashedPassword,
  )
  return isCorrectPassword ? user : null
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {},
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (credentials) => {
      try {
        const { email, password } =
          await signInSchema.parseAsync(credentials) // Validate the credentials
        // get user from db and compare password hashes
        const user = await getUser(email, password)

        if (!user) {
          throw new Error('User not found.')
        }
        return user
      } catch (error) {
        if (error instanceof ZodError) {
          // Return `null` to indicate that the credentials are invalid
          return null
        }
        return null
      }
    },
  }),
  Google,
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    }
    return { id: provider.id, name: provider.name }
  })
  .filter((provider) => provider.id !== 'credentials')

const authConfig: NextAuthConfig = {
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma),
  providers,
  // If you need to customize the pages, you can do so here
  // pages: {
  //   signIn: '/signin',
  // },
  session: {
    strategy: 'jwt', // Credentials ProviderはJWT戦略を使う
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      const scope = Sentry.getCurrentScope()
      scope.setUser({
        id: token.id,
        email: token.email ?? '',
      })

      return session
    },
  },
}

const nextAuth = NextAuth(authConfig)

// https://github.com/nextauthjs/next-auth/issues/10568
const signIn: NextAuthResult['signIn'] = nextAuth.signIn
const auth: NextAuthResult['auth'] = nextAuth.auth
const handlers: NextAuthResult['handlers'] = nextAuth.handlers
const signOut: NextAuthResult['signOut'] = nextAuth.signOut

// Server actions
export { auth, handlers, signIn, signOut }
