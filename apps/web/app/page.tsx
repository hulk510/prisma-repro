import { auth } from '@repo/auth'
import { SignInButton } from './components/SignInButton'

export default async function Page() {
  const session = await auth()

  console.log(session)
  return (
    <main>
      <h1>Apps</h1>
      <p>Hello world!</p>
      <SignInButton />
      {session ? (
        <p>{session.user?.name}</p>
      ) : (
        <p>Session does not exist</p>
      )}
    </main>
  )
}
