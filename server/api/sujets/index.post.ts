import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    let body = await readBody(event);
    if (!body.title || !body.author || !body.forum || body.title === "" || body.message ==="" || isNaN(body.author) || isNaN(body.forum)) {
        setResponseStatus(event, 400)
        return {
            error: "Informations manquantes"
        }
    } else {
        let [author] = await db.execute('SELECT * FROM users WHERE id = ?', [body.author])
        let [forum] = await db.execute('SELECT * FROM forums WHERE id = ?', [body.forum])
        if (author.length === 0 || forum.length === 0) {
            setResponseStatus(event, 400)
            return {
                error: "Auteur ou forum inexistant"
            }
        }
        let [result] = await db.execute(
            "INSERT INTO sujets (title, author_id, forum_id, date) VALUES (?, ?, ?, NOW())", [body.title, body.author, body.forum]
        )
        if (result.affectedRows === 1) {

            let [result2] = await db.execute(
                "INSERT INTO messages (content, date, author_id, sujet_id) values (?, now(), ?,?)", [body.message, body.author, result["insertId"]]
            )
            if(result.affectedRows === 1){
                setResponseStatus(event, 201)
                return {

                        message: "Sujet/message enregistré"

                }
            } else {
                setResponseStatus(event, 500)
                return {
                    error: "Sujet non crée"
                }
            }


        } else {
            setResponseStatus(event, 500)
            return {
                error: "Sujet non crée"
            }
        }
    }
});