import db from '~/server/sql'

export default defineEventHandler(async (event) => {
    if (event.context.params && event.context.params.idForum) {
        let NbParPage = 5
        if(event.context.params.idForum === ''){
            setResponseStatus(event, 400)
            return {
                error: "id not found"
            }
        }
        // @ts-ignore
        var page = parseInt(getQuery(event).page) || 1

        var id = event.context.params.idForum
        // @ts-ignore
        let IDpage = page * NbParPage
        let queryNombreSujets = "SELECT COUNT(*) as nombre_sujets FROM sujets WHERE forum_id = ?"
        let [rowsNombreSujets, __] = await db.execute(queryNombreSujets, [id])
        // @ts-ignore
        let pageMax = Math.ceil(rowsNombreSujets[0].nombre_sujets / NbParPage) -1
        if (page > pageMax) {
            return {
                error: "page not found"
            }
        }
        let query = "SELECT * FROM sujets WHERE forum_id = ? ORDER BY date LIMIT ? OFFSET ?"
        let [rows, _] = await db.execute(query, [id, NbParPage, IDpage])


        if (Array.isArray(rows) && rows.length === 0) {
            setResponseStatus(event, 404)
            return {
                error: `Forums not found : ${id}`
            }
        }
        let json = {
            page,
            pageMax,
            rowsNombreSujets,
            data: rows

        }
        return json
    } else {
        setResponseStatus(event, 400)
        return {
            error: "id not found"
        }
    }
});