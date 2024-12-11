'use client'

import { useActionState } from 'react'
import { createArticle } from '../../_actions/createArticle'

export default function Form() {
  const [state, action] = useActionState(createArticle, {
    message: '',
  })
  return (
    <main>
      <form action={action}>
        <button type='submit'>Submit</button>
      </form>
      <p>{state.message}</p>
    </main>
  )
}
