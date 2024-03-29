import db from '~/server/sql'
// @ts-ignore


export default defineEventHandler(async (event) => {
    let body = await readBody(event);
    if (!body.login || !body.password || !body.admin || body.login === "" || body.password === "") {
        setResponseStatus(event, 400)
        return {
            error: "Information missing"
        }
    } else {
        const [rows] = await db.connection.execute(
            "SELECT * FROM users WHERE login = ?", [body.login]
        )
        if (rows.length > 0) {
            setResponseStatus(event, 401)
            return {
                error: "Login already exists"
            }
        } else {
            // let hashedPassword = await bcrypt.hash(body.password, 10);
            await db.connection.execute(
                "INSERT INTO users (login, password) VALUES (?, ?)", [body.login, hashedPassword]
            )
            return {
                userAdded: "yes"
            }
        }
    }
});