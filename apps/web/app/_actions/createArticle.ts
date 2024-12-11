'use server'

import { prisma } from '@repo/db'

export async function createArticle(
  prevState: State,
  payload: FormData,
) {
  try {
    await prisma.article.create({
      data: {
        title: 'Hello World',
        content: 'This is my first article',
        authorName: 'Alice',
      },
    })
  } catch (error) {
    console.error(error)
    return {
      message: 'Failed to create article',
    }
  }
  return {
    message: 'Article created',
  }
}

export type State = {
  message: string
}
