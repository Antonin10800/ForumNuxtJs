// @ts-ignore
import bcrypt from 'bcrypt';
import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    let body = await readBody(event);
    if (!body.login || !body.password || !body.lastPassword || body.login === "" || body.password === "" || body.lastPassword === "") {
        setResponseStatus(event, 400)
        return {
            error: "Informations manquantes"
        }
    } else {
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE login = ?", [body.login]
        )
        // @ts-ignore
        if (rows.length === 0) {
            setResponseStatus(event, 401)
            return {
                error: "Utilisateur inéxistant"
            }
        } else {
            let match = await bcrypt.compare(body.lastPassword, rows[0].password);
            if (!match) {
                setResponseStatus(event, 401)
                return {
                    error: "Ancien mot de passe incorrect"
                }
            } else{
                let hashedPassword = await bcrypt.hash(body.password, 10);
                let [result] = await db.execute(
                    "UPDATE users SET password = ? WHERE login = ?", [hashedPassword, body.login]
                )
                if (result.affectedRows === 1) {
                    setResponseStatus(event, 200)
                    return {
                        passwordEdit: true
                    }
                } else {
                    setResponseStatus(event, 500)
                    return {
                        error: "problème pour modifier le mot de passe"
                    }
                }
            }
        }
    }
});