import db from '~/server/sql'
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
    let body = await readBody(event);
    if (!body.login || !body.password) {
        setResponseStatus(event, 400)
        return {
            error: "Login or password missing"
        }
    } else {
        const [rows] = await db.connection.execute(
            "SELECT * FROM users WHERE login = ?", [body.login]
        )
        if (rows.length > 0) {
            if (rows[0].password === body.password) {
                setResponseStatus(event, 200)
                return {
                    connected: "true",
                    user: rows[0]
                }
            } else {
                setResponseStatus(event, 401)
                return {
                    connected: "false"
                }
            }
        }

    }
});