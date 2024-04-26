import { defineWrappedResponseHandler } from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql;
    let body = await readBody(event);

    if (!body.title || body.title === '' || !body.idForum || isNaN(body.idForum)) {
        setResponseStatus(event, 400);
        return {
            error: "Le titre ou l'id du forum est manquant ou invalide"
        };
    } else {
        try {
            const forumId = body.idForum;
            const { title } = body;

            const [existingForum] = await db.execute('SELECT * FROM forums WHERE id = ?', [forumId]);
            if (existingForum.length === 0) {
                setResponseStatus(event, 404);
                return { success: false, message: `Forum introuvable avec l'ID : ${forumId}` };
            }

            const updateQuery = `UPDATE forums SET title = ? WHERE id = ?`;
            const [result] = await db.execute(updateQuery, [title, forumId]);

            if (result.affectedRows === 1) {
                return { success: true, message: `Titre du forum mis à jour avec succès.` };
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du titre du forum :", error);
            return { success: false, message: "Une erreur s'est produite lors de la mise à jour du titre du forum." };
        }
    }
});
