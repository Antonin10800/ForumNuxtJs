import {defineWrappedResponseHandler} from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql;
    if (event.context.params && event.context.params.idMessage) {
        let idMessage = parseInt(event.context.params.idMessage);
        try {
            const [existingMessage] = await db.execute('SELECT * FROM messages WHERE id = ?', [idMessage]);
            if (existingMessage.length === 0) {
                setResponseStatus(event, 404);
                return {success: false, message: `Message introuvable avec l'ID : ${idMessage}`};
            }
            const deleteQuery = `DELETE FROM messages WHERE id = ?`;
            const [result] = await db.execute(deleteQuery, [idMessage]);
            if (result.affectedRows === 1) {
                return {success: true, message: `Message supprimé avec succès.`};
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du message :", error);
            return {success: false, message: "Une erreur s'est produite lors de la suppression du message."};
        }
    }else {
        setResponseStatus(event, 400);
        return {
            error: "idMessage manquant dans les paramètres de la requête"
        };
    }

});