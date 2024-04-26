import { defineWrappedResponseHandler } from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql;
    let body = await readBody(event);

    if(event.context.params === undefined) {
        setResponseStatus(event, 400);
        return {
            error: "L'ID du sujet est manquant ou invalide"
        };
    }

    if (body.title === undefined || body.title === '') {
        setResponseStatus(event, 400);
        return {
            error: "Le titre du sujet est manquant ou invalide"
        };
    } else {
        try {
            const SujetId = event.context.params.idSujet;
            const { title } = body;

            const [existingSujet] = await db.execute('SELECT * FROM sujets WHERE id = ?', [SujetId]);
            if (existingSujet.length === 0) {
                setResponseStatus(event, 404);
                return { success: false, message: `Sujet introuvable avec l'ID : ${SujetId}` };
            }

            const updateQuery = `UPDATE sujets SET title = ? WHERE id = ?`;
            const [result] = await db.execute(updateQuery, [title, SujetId]);

            if (result.affectedRows === 1) {
                return { success: true, message: `Titre du Sujet mis à jour avec succès.` };
            }
        } catch (error) {
            return { success: false, message: "Une erreur s'est produite lors de la mise à jour du titre du Sujet." };
        }
    }
});
