import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    if (event.context.params && event.context.params.idForum) {
        if (event.context.params.idForum === '') {
            setResponseStatus(event, 400)
            return {
                error: "idForum manquant dans les paramètres de la requête"
            }
        }
        let NbParPage = 10
        let page = parseInt(<string>getQuery(event).page) || 1
        let id = event.context.params.idForum

        let queryNombreSujets = "SELECT COUNT(*) as nombre_sujets FROM sujets WHERE forum_id = ?"
        let [rowsNombreSujets, __] = await db.execute(queryNombreSujets, [id])

        let pageMax = Math.ceil(rowsNombreSujets[0].nombre_sujets / NbParPage)
        if (page > pageMax) {
            page = pageMax
        }

        let indice = (page-1) * NbParPage
        let query = `SELECT sujets.id, sujets.title, sujets.date, sujets.forum_id, users.login,
                            (
                                SELECT MAX(messages.date)
                                FROM messages
                                WHERE messages.sujet_id = sujets.id
                            ) AS last_message_date
                     FROM sujets
                              LEFT JOIN users ON users.id = sujets.author_id
                     WHERE sujets.forum_id = ?
                     ORDER BY last_message_date DESC
                         LIMIT ? OFFSET ?`
        let [rows, _] = await db.execute(query, [id, NbParPage, indice])

        //pour chaque sujet, je veux récupérer le nom du user qui a posté le dernier message
        for (let i = 0; i < rows.length; i++) {
            let query = `SELECT users.login 
                            FROM messages 
                                LEFT JOIN users ON users.id = messages.author_id 
                            WHERE sujet_id = ? 
                            ORDER BY date DESC 
                            LIMIT 1`
            let [rows2, _] = await db.execute(query, [rows[i].id])
            if (Array.isArray(rows2) && rows2.length > 0) {
                rows[i].last_message_author = rows2[0].login
            }

        }

        if (Array.isArray(rows) && rows.length === 0) {
            setResponseStatus(event, 404)
            return {
                error: `Pas de sujets pour ce forum`
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
            error: "idForum manquant dans les paramètres de la requête"
        }
    }
});