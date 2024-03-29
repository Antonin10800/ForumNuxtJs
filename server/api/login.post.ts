import db from '~/server/sql'
// @ts-ignore


export default defineEventHandler(async (event) => {
    let body = await readBody(event);
    if (!body.login || !body.password) {
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
            let result = body.password === rows[0].password
            if (result) {
                // @ts-ignore

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