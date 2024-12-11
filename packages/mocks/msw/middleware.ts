import isEqual from 'lodash/isEqual'
import type {
  DefaultBodyType,
  HttpResponseResolver,
  PathParams,
} from 'msw'

export function withJsonBody<
  Params extends PathParams,
  RequestBodyType extends DefaultBodyType,
  ResponseBodyType extends DefaultBodyType,
>(
  expectedBody: RequestBodyType,
  resolver: HttpResponseResolver<
    Params,
    RequestBodyType,
    ResponseBodyType
  >,
): HttpResponseResolver<Params, RequestBodyType, ResponseBodyType> {
  return async (args) => {
    const { request } = args

    // Ignore requests that have a non-JSON body.
    const contentType = request.headers.get('Content-Type') || ''
    if (!contentType.includes('application/json')) {
      return
    }

    // Clone the request and read it as JSON.
    const actualBody = await request.clone().json()

    // Compare two objects using "lodash".
    if (!isEqual(actualBody, expectedBody)) {
      return
    }

    return resolver(args)
  }
}
