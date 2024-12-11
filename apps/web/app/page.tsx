import { auth } from "@repo/auth"
import Link from "next/link"

export default async function Page() {
  const session = await auth()
  console.log(session)
  return (
    <main>
      <Link href='/create'>Create Article</Link>
      {session ? "logged in": "not logged in"}
    </main>
  )
}
