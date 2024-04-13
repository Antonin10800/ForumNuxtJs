// @ts-ignore
import bcrypt from 'bcrypt';
import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    let body = await readBody(event);
    if (!body.login || !body.password || body.login === "" || body.password === "" || body.admin === undefined) {
        setResponseStatus(event, 400)
        return {
            error: "Informations manquantes"
        }
    } else {
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE login = ?", [body.login]
        )
        // @ts-ignore
        if (rows.length > 0) {
            setResponseStatus(event, 401)
            return {
                error: "Le nom d'utilisateur existe déjà"
            }
        } else {
            let hashedPassword = await bcrypt.hash(body.password, 10);
            let [result] = await db.execute(
                "INSERT INTO users (login, password, admin) VALUES (?, ?, ?)", [body.login, hashedPassword, body.admin]
            )
            if (result.affectedRows === 1) {
                setResponseStatus(event, 201)
                return {
                    userCreated: true
                }
            } else {
                setResponseStatus(event, 500)
                return {
                    error: "problème pour créer l'utilisateur"
                }
            }
        }
    }
});