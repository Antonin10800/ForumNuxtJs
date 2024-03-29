import {defineWrappedResponseHandler} from "~/server/utils/mysql";
export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
    let query = `SELECT * FROM users`
    let [rows, _] = await db.execute(query)
    return rows
});