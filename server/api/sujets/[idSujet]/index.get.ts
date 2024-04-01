import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    if (event.context.params && event.context.params.idSujet) {
        let id = event.context.params.idSujet
        const query = `SELECT * FROM sujets WHERE id = ?`
        let [rows, _] = await db.execute(query, [id])
        if (Array.isArray(rows) && rows.length === 0) {
            setResponseStatus(event, 404)
            return {
                error: `Sujet not found : ${id}`
            }
        }
        return rows
    } else {
        setResponseStatus(event, 400)
        return {
            error: "idSujet not found in body"
        }
    }
});