import 'reflect-metadata'

import { container, Client } from './config'

export async function getProfile(username: string) {
    const services = await container()
    const client = services.resolve(Client)

    const user = await client.getUser(username)
    const repos = await client.getRepos(user)
    
    return {
        avatar: user.avatar_url,
        projects: await Promise.all(repos.map(async repo => ({
            name: repo.name,
            description: repo.description,
            repo: repo.url,
            site: repo.homepage,
            showcase: repo.topics.includes('showcase'),
            topics: repo.topics.filter(topic => topic !== 'showcase'),
            languages: await client.getLangs(user, repo.name),
            updated: repo.pushed_at,
        })))
    }
}