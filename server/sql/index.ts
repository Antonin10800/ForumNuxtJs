// @ts-ignore
import mysql from 'mysql2/promise'
// @ts-ignore
import bluebird from 'bluebird'
const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: 'password',
    database: 'forum',
    Promise: bluebird,
})
export default connection