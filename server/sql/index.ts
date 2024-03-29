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

async function getList(table : string) {
    let query = `SELECT * FROM ${table}`
    let [rows, _] = await connection.execute(query)
    return rows
}

async function getOne(table : string, event: any) {
    if (event.context.params && event.context.params.id) {
        let id = event.context.params.id
        const query = `SELECT * FROM ${table} WHERE id = ?`
        let [rows, _] = await connection.execute(query, [id])
        if (Array.isArray(rows) && rows.length === 0) {
            setResponseStatus(event, 404)
            return {
                error: `User not found : ${id}`
            }
        }
        return rows
    } else {
        setResponseStatus(event, 400)
        return {
            error: "id not found"
        }
    }
}
export default connection