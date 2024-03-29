// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/forums/:id': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/forums/[id].get').default>>>>
    }
    '/api/forums/:idForum/sujets': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/forums/[idForum]/sujets.get').default>>>>
    }
    '/api/forums/:idForum/sujets/:idSujet': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/forums/[idForum]/sujets/[idSujet]/index.get').default>>>>
    }
    '/api/forums/:idForum/sujets/:idSujet/messages/:idMessage': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/forums/[idForum]/sujets/[idSujet]/messages/[idMessage]/index.get').default>>>>
    }
    '/api/forums/:idForum/sujets/:idSujet/messages': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/forums/[idForum]/sujets/[idSujet]/messages/index.get').default>>>>
    }
    '/api/forums': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/forums/index.get').default>>>>
    }
    '/api/login': {
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/login.post').default>>>>
    }
    '/api/sujets/:id': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/sujets/[id].get').default>>>>
    }
    '/api/sujets': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/sujets/index.get').default>>>>
    }
    '/api/users/:id': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/users/[id].get').default>>>>
    }
    '/api/users': {
      'get': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/users/index.get').default>>>>
      'post': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/users/index.post').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
  }
}
export {}