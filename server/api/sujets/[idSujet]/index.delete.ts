import { defineWrappedResponseHandler } from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql;
    if (event.context.params && event.context.params.idSujet) {
        const SujetId = event.context.params.idSujet;
        try {
            const deleteQueryMessages = `DELETE FROM messages WHERE sujet_id = ?`;
            await db.execute(deleteQueryMessages, [SujetId]);

            const deleteQuery = `DELETE FROM sujets WHERE id = ?`;
            const [result] = await db.execute(deleteQuery, [SujetId]);

            if (result.affectedRows === 1) {
                return {
                    success: true,
                    message: `Sujet supprimé avec succès.`
                };
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du Sujet :", error);
            return { success: false, message: "Une erreur s'est produite lors de la suppression du Sujet.", error:error };
        }
    } else {
        setResponseStatus(event, 400)
        return {
            error: "idSujet manquant dans le body"
        }
    }
});
