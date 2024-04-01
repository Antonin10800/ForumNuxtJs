import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    if (event.context.params) {
        if (!event.context.params.id || event.context.params.id === '') {
            setResponseStatus(event, 400)
            return {
                error: "id not found"
            }
        } else {
            let NbParPage = 5
            let page = parseInt(<string>getQuery(event).page) || 1
            let id = event.context.params.id

            let queryNombreMessages = "SELECT COUNT(*) as nbMessages FROM messages WHERE sujet_id = ?"
            let [rowsNombreMessages, __] = await db.execute(queryNombreMessages, [id])

            let pageMax = Math.ceil(rowsNombreMessages[0].nbMessages / NbParPage) - 1
            if (page > pageMax) {
                page = pageMax
            }
            let IDpage = (page-1) * NbParPage
            let query = "SELECT messages.id, messages.content, messages.date, messages.sujet_id, users.login FROM messages LEFT JOIN users ON users.id = messages.author_id WHERE sujet_id = ? ORDER BY date LIMIT ? OFFSET ?"
            let [rows, _] = await db.execute(query, [id, NbParPage, IDpage])

            if (Array.isArray(rows) && rows.length === 0) {
                setResponseStatus(event, 404)
                return {
                    error: `Not messages for this sujet : ${id}`
                }
            }
            let nombreSujets = rowsNombreMessages[0].nbMessages
            return {
                page,
                pageMax,
                nombreSujets,
                data: rows
            }
        }
    } else {
        setResponseStatus(event, 400)
        return {
            error: "id not found"
        }
    }
})