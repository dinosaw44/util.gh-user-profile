import { inject, injectable } from 'tsyringe'
import { createClient } from 'fets'
import merge from 'lodash.merge'

import type { ClientOptions, ClientOptionsWithStrictEndpoint, OASClient, OASOutput, NormalizeOAS } from 'fets'
import type spec from './spec/api.github.com'

type ApiSpec = NormalizeOAS<typeof spec>

type Languages = OASOutput<ApiSpec, '/repos/{owner}/{repo}/languages', 'get', '200'>
type Repo = OASOutput<ApiSpec, '/repos/{owner}/{repo}', 'get', '200'>
type User = OASOutput<ApiSpec, '/users/{username}', 'get', '200'>

@injectable()
export class Client {

    static readonly uri = "https://api.github.com"

    private static init(options: ClientOptionsWithStrictEndpoint<ApiSpec>) {
        const headers = { 'User-Agent': '' }
        return createClient<ApiSpec>(merge({ globalParams: { headers } }, options))
    }

    private readonly client: OASClient<ApiSpec>

    constructor(@inject('ClientOptions') { ...opts }: Omit<ClientOptions, 'endpoint'> = {}) {
        this.client = Client.init({
            endpoint: Client.uri,
            ...opts,
        })
    }

    async getLangs({ login: owner }: User, repo: string) {
        return this.client['/repos/{owner}/{repo}/languages'].get({ params: {
            owner,
            repo,
        }}).json() as Promise<Languages>
    }

    async getRepo({ login: owner }: User, repo: string) {
        return this.client['/repos/{owner}/{repo}'].get({ params: {
            owner,
            repo,
        }}).json() as Promise<Repo>
    }

    async getRepos({ login: username }: User) {
        return this.client['/users/{username}/repos'].get({ params: {
            username,
        }}).json() as Promise<Repo[]>
    }

    async getUser(name: string) {
        return this.client['/users/{username}'].get({ params: {
            username: name,
        }}).json() as Promise<User>
    }
}