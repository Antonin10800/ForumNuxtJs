import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    let query = `SELECT forums.*, Count(sujets.id) AS nbSujets FROM forums LEFT JOIN sujets ON forums.id = sujets.forum_id GROUP BY(forums.id)`
    let [rows, _] = await db.execute(query)
    return rows
});