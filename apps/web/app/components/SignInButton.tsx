'use client'
import { LoginButton } from '@repo/ui/loginButton'
import { signIn } from 'next-auth/react'
export function SignInButton() {
  return (
    <LoginButton type='button' onClick={() => signIn()}>
      Sign in
    </LoginButton>
  )
}
