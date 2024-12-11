import { http, HttpResponse } from 'msw'

export const handlers = [
  // Your handlers go here.
  http.get('/', () => {
    return HttpResponse.json({ message: 'Hello, World!' })
  }),
]
