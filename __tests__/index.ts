import 'reflect-metadata'

import { expect, test } from '@jest/globals'
import { container } from 'tsyringe'

import { Client } from '../api'
import { getProfile } from '..'

import { fetchFn } from './support/fixtures'

const fixture = container
    .createChildContainer()
    .register('ClientOptions', { useValue: {
        fetchFn,
    }})
    
test("get user", async () => {
    const client = fixture.resolve(Client)

    const name = 'dinosaw44'
    const user = await client.getUser(name)

    expect(user.login).toEqual(name)
})

test("get projects", async () => {
    const { projects } = await getProfile('dinosaw44')

    expect(projects).toHaveLength(3)
})