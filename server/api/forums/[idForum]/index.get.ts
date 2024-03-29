import db from '~/server/sql'

export default defineEventHandler(async (event) => {
    if (event.context.params && event.context.params.idForum) {
        let id = event.context.params.idForum
        const query = `SELECT * FROM forums WHERE id = ?`
        let [rows, _] = await db.execute(query, [id])
        if (Array.isArray(rows) && rows.length === 0) {
            setResponseStatus(event, 404)
            return {
                error: `Forums not found : ${id}`
            }
        }
        return rows
    } else {
        setResponseStatus(event, 400)
        return {
            error: "id not found"
        }
    }
});