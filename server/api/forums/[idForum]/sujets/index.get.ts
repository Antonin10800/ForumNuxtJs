import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    if (event.context.params && event.context.params.idForum) {
        if (event.context.params.idForum === '') {
            setResponseStatus(event, 400)
            return {
                error: "id not found"
            }
        }
        let NbParPage = 5
        let page = parseInt(<string>getQuery(event).page) || 1
        let id = event.context.params.idForum
        let IDpage = (page-1) * NbParPage

        let queryNombreSujets = "SELECT COUNT(*) as nombre_sujets FROM sujets WHERE forum_id = ?"
        let [rowsNombreSujets, __] = await db.execute(queryNombreSujets, [id])

        let pageMax = Math.ceil(rowsNombreSujets[0].nombre_sujets / NbParPage) - 1
        if (page > pageMax) {
            setResponseStatus(event, 404)
            return {
                error: "page not found"
            }
        }
        let query = "SELECT sujets.id, sujets.title, sujets.date, sujets.forum_id, users.login FROM sujets LEFT JOIN forum.users ON users.id = sujets.author_id WHERE forum_id = ? ORDER BY date LIMIT ? OFFSET ?"
        let [rows, _] = await db.execute(query, [id, NbParPage, IDpage])

        if (Array.isArray(rows) && rows.length === 0) {
            setResponseStatus(event, 404)
            return {
                error: `Forums not found : ${id}`
            }
        }
        let nombreSujets = rowsNombreSujets[0].nombre_sujets
        return {
            page,
            pageMax,
            nombreSujets,
            data: rows
        }
    } else {
        setResponseStatus(event, 400)
        return {
            error: "id not found"
        }
    }
});