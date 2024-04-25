import { defineWrappedResponseHandler } from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql;
    let body = await readBody(event);

    if (!body.title || !body.author_id) {
        setResponseStatus(event, 400);
        return {
            error: "Le titre du forum ou l'identifiant de l'auteur est manquant ou invalide"
        };
    } else {
        try {
            const { title, author_id } = body;

            const insertQuery = `INSERT INTO forums (title, author_id) VALUES (?, ?)`;
            const [result] = await db.execute(insertQuery, [title, author_id]);

            if (result.affectedRows === 1) {
                return { success: true, message: `Forum "${title}" créé avec succès.` };
            } else {
                return { success: false, message: `Erreur lors de la création du forum.` };
            }
        } catch (error) {
            console.error("Erreur lors de la création du forum :", error);
            return { success: false, message: "Une erreur s'est produite lors de la création du forum." };
        }
    }
});
