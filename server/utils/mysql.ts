import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import type {EventHandler, EventHandlerRequest} from 'h3'

export const defineWrappedResponseHandler = <T extends
    EventHandlerRequest, D>(
    handler: EventHandler<T, D>
): EventHandler<T, D> =>
    defineEventHandler<T>(async event => {
        try {
            event.context.mysql = await mysql.createConnection({
                host: 'db',
                port: 3306,
                user: 'user',
                password: 'password',
                database: 'forum',
                Promise: bluebird,
            })
            const response =  await handler(event)
            event.context.mysql.end()
            return response
        } catch (err) {
            // Error handling
            return err
        }
    })