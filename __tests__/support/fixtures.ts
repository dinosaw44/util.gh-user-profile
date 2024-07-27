import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import { Client } from '../../api'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const fetchFn = (endpoint: string) => {
    const api = new RegExp(`^${Client.uri}`)
    const dir = resolve(__dirname, '..', '..', '__mockData__')
    
    const path = `${endpoint.replace(api, dir)}.json`
    const data = readFileSync(path, {
        encoding: 'utf-8',
    })

    return new Response(data, {
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
    })
}