import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    let body = await readBody(event);
    if (!body.title || !body.author || !body.forum || body.title === "" || body.author === "" || body.forum === "") {
        setResponseStatus(event, 400)
        return {
            error: "Information missing"
        }
    } else {
        let [result] = await db.execute(
            "INSERT INTO sujets (title, author_id, forum_id, date) VALUES (?, ?, ?, NOW())", [body.title, body.author, body.forum]
        )
        if (result.affectedRows === 1) {
            setResponseStatus(event, 201)
            return {
                message: "Sujet created"
            }
        } else {
            setResponseStatus(event, 500)
            return {
                error: "Sujet not created"
            }
        }
    }
});