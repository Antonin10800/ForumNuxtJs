import {defineWrappedResponseHandler} from "~/server/utils/mysql";


export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    if (event.context.params && event.context.params.id) {
        let id = event.context.params.id
        const query = `SELECT id, login, admin FROM users WHERE id = ? OR login = ?`
        let [rows, _] = await db.execute(query, [id, String(id)])
        if (Array.isArray(rows) && rows.length === 0) {
            setResponseStatus(event, 404)
            return {
                error: `Utilisateur introuvable : ${id}`
            }
        }
        return {
            id: rows[0].id,
            login: rows[0].login,
            admin: rows[0].admin
        }
    } else {
        setResponseStatus(event, 400)
        return {
            error: "Identifiant manquant"
        }
    }
});