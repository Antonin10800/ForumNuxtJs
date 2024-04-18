import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    if (event.context.params) {
        if (!event.context.params.idSujet || event.context.params.idSujet === '') {
            setResponseStatus(event, 400)
            return {
                error: "idSujet manquant dans les paramètres de la requête"
            }
        } else {
            let NbParPage =10
            let page = parseInt(<string>getQuery(event).page) || 1
            let id = event.context.params.idSujet

            let queryNombreMessages = "SELECT COUNT(*) as nbMessages FROM messages WHERE sujet_id = ?"
            let [rowsNombreMessages, __] = await db.execute(queryNombreMessages, [id])

            let pageMax = Math.ceil(rowsNombreMessages[0].nbMessages / NbParPage) - 1
            if (page > pageMax) {
                page = pageMax
            }
            if (page-1 <= 0) {
                page = 1
            }
            let IDpage = (page-1) * NbParPage
            let query = "SELECT messages.id, messages.content, messages.date, messages.sujet_id, users.login FROM messages LEFT JOIN users ON users.id = messages.author_id WHERE sujet_id = ? ORDER BY date LIMIT ? OFFSET ?"
            let [rows, _] = await db.execute(query, [id, NbParPage, IDpage])

            if (Array.isArray(rows) && rows.length === 0) {
                setResponseStatus(event, 404)
                return {
                    error: `Pas de messages pour ce sujet`
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
            error: "idSujet manquant dans les paramètres de la requête"
        }
    }
})

