import { defineWrappedResponseHandler } from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql;
    if (event.context.params && event.context.params.idForum) {
        const forumId = event.context.params.idForum;
        try {
            const deleteQuery = `DELETE FROM forums WHERE id = ?`;
            const [result] = await db.execute(deleteQuery, [forumId]);

            if (result.affectedRows === 1) {
                return true;
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du forum :", error);
            return { success: false, message: "Une erreur s'est produite lors de la suppression du forum.", error:error };
        }
    } else {
        setResponseStatus(event, 400)
        return {
            error: "idForum manquant dans le body"
        }
    }
});
