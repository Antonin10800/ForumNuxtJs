import { defineWrappedResponseHandler } from "~/server/utils/mysql";

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql;
    let body = await readBody(event);

    if (!body.content || !body.author_id || !body.sujet_id || body.content === "" || isNaN(body.author_id) || isNaN(body.sujet_id)) {
        setResponseStatus(event, 400);
        return {
            error: "Les données du message sont incomplètes"
        };
    } else {
        try {
            const query = "INSERT INTO messages (content, date, author_id, sujet_id) VALUES (?, NOW(), ?, ?)";
            await db.execute(query, [body.content, body.author_id, body.sujet_id]);

            setResponseStatus(event, 201);
            return {
                success: "Le message a été créé avec succès"
            };
        } catch (error) {
            setResponseStatus(event, 500);
            return {
                error: "Une erreur s'est produite lors de la création du message"
            };
        }
    }
});
