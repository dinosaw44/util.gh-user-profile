import { container as _container } from 'tsyringe'
import { ClientOptions } from 'fets'

export { Client } from './api'

export const container = async () => {
    const clientOptions: ClientOptions = { 
        globalParams: {
            headers: { 'User-Agent': '' },
        },
    }

    if (process.env.NODE_ENV === 'development') {
        const { fetchFn } = await import('./__tests__/support/fixtures')
        clientOptions['fetchFn'] = fetchFn
    }

    return _container.register('ClientOptions', { useValue: clientOptions })
}
