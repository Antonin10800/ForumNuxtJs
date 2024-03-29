// @ts-ignore
import bcrypt from 'bcrypt';
import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    let body = await readBody(event);
    if (!body.login || !body.password || !body.admin || body.login === "" || body.password === "") {
        setResponseStatus(event, 400)
        return {
            error: "Information missing"
        }
    } else {
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE login = ?", [body.login]
        )
        // @ts-ignore
        if (rows.length > 0) {
            setResponseStatus(event, 401)
            return {
                error: "Login already exists"
            }
        } else {
            let hashedPassword = await bcrypt.hash(body.password, 10);
            await db.execute(
                "INSERT INTO users (login, password) VALUES (?, ?)", [body.login, hashedPassword]
            )
            setResponseStatus(event, 201)
            return {
                userAdded: "yes"
            }
        }
    }
});