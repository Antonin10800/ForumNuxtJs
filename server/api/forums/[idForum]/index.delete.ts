import { defineWrappedResponseHandler } from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql;
    if (event.context.params && event.context.params.idForum) {
        const forumId = event.context.params.idForum;
        try {
            const selectQuerySujets = `SELECT id FROM sujets WHERE forum_id = ?`;
            const [sujetsRows] = await db.execute(selectQuerySujets, [forumId]);

            for (const sujetRow of sujetsRows) {
                const sujetId = sujetRow.id;
                const deleteQueryMessages = `DELETE FROM messages WHERE sujet_id = ?`;
                await db.execute(deleteQueryMessages, [sujetId]);
            }

            const deleteQuerySujets = `DELETE FROM sujets WHERE forum_id = ?`;
            await db.execute(deleteQuerySujets, [forumId]);

            const deleteQueryForum = `DELETE FROM forums WHERE id = ?`;
            const [result] = await db.execute(deleteQueryForum, [forumId]);



            if (result.affectedRows === 1) {
                return {
                    success: true,
                    message: `Forum supprimé avec succès.`
                };
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
