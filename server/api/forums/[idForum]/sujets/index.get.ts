import db from '~/server/sql'

export default defineEventHandler(async (event) => {
    // let query = "SELECT * FROM sujets WHERE forum_id = ?"
    // if (event.context.params && event.context.params.idForum) {
    //     let [rows, _] = await db.connection.execute(query, [event.context.params.idForum])
    //     if (Array.isArray(rows) && rows.length === 0) {
    //         setResponseStatus(event, 404)
    //         return {
    //             error: `forum not found : ${event.context.params.idForum}`
    //         }
    //     }
    //     return rows
    // } else {
    //     setResponseStatus(event, 400)
    //     return {
    //         error: "idForum not found"
    //     }
    // }
    return {
        message: "Hello, World!"
    }
});