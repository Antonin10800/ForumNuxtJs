import {defineWrappedResponseHandler} from "~/server/utils/mysql";


export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    if (event.context.params && event.context.params.id) {
        let id = event.context.params.id
        const query = `SELECT * FROM users WHERE id = ?`
        let [rows, _] = await db.execute(query, [id])
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
});