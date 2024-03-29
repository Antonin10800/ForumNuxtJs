// @ts-ignore
import bcrypt from 'bcrypt';
import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    let body = await readBody(event);
    if (!body.login || body.login === '' || !body.password || body.password === '') {
        setResponseStatus(event, 400)
        return {
            error: "Login or password missing"
        }
    } else {
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE login = ?", [body.login]
        )
        // @ts-ignore
        if (rows.length > 0) {
            // @ts-ignore
            let result = await bcrypt.compare(body.password, rows[0].password)
            // @ts-ignore
            if (result) {
                return {
                    connected: "true",
                    // @ts-ignore
                    user: rows[0]
                }
            }
        }
        setResponseStatus(event, 401)
        return {
            connected: "false"
        }
    }
});