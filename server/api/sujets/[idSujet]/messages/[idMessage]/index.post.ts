import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql;
    let body = await readBody(event);
    if (event.context.params && event.context.params.idMessage) {
        let idMessage = parseInt(event.context.params.idMessage);
        if (!body.content || body.content === '' || typeof body.content !== 'string') {
            setResponseStatus(event, 400);
            return {
                error: "Le contenu du message est manquant ou invalide"
            };
        } else {
            try {
                const {content} = body;
                const [existingMessage] = await db.execute('SELECT * FROM messages WHERE id = ?', [idMessage]);
                if (existingMessage.length === 0) {
                    setResponseStatus(event, 404);
                    return {success: false, message: `Message introuvable avec l'ID : ${idMessage}`};
                }
                const updateQuery = `UPDATE messages SET content = ? WHERE id = ?`;
                const [result] = await db.execute(updateQuery, [content, idMessage]);
                if (result.affectedRows === 1) {
                    return {success: true, message: `Contenu du message mis à jour avec succès.`};
                }
            } catch (error) {
                console.error("Erreur lors de la mise à jour du contenu du message :", error);
                return {success: false, message: "Une erreur s'est produite lors de la mise à jour du contenu du message."};
            }
        }
    } else {
        setResponseStatus(event, 400);
        return {
            error: "idMessage manquant dans les paramètres de la requête"
        };
    }
});