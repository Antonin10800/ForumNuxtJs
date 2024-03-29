import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql
  if (event.context.params){
      if(!event.context.params.id){
          setResponseStatus(event, 400)
          return{
                error: "id not found"
          }
      } else {
            let idSujet = event.context.params.id
            let query = "SELECT * FROM messages WHERE sujet_id = ?"
            let [rows, _] = await db.execute(query, [idSujet])
            if (Array.isArray(rows) && rows.length === 0) {
                setResponseStatus(event, 404)
                return {
                    error: `Sujets not found : ${idSujet}`
                }
            }
            return rows
      }
  }
})