import db from '~/server/sql'

export default defineEventHandler(async (event) => {
    let query = `SELECT * FROM forums`
    let [rows, _] = await db.execute(query)
    return rows
});