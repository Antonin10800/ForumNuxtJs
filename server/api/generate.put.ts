import {defineWrappedResponseHandler} from "~/server/utils/mysql";
import { fakerFR } from '@faker-js/faker';

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql;
    let body = await readBody(event)

    if(isNaN(body.nbForumMin) ||
        isNaN(body.nbForumMax) ||
        isNaN(body.nbSujetMin) ||
        isNaN(body.nbSujetMax) ||
        isNaN(body.nbMessageMin) ||
        isNaN(body.nbMessageMax) ||
        isNaN(body.nbUser) ||
        isNaN(body.nbAdmin) ||
        body.nbForumMin === 0 ||
        body.nbForumMax === 0 ||
        body.nbSujetMin === 0 ||
        body.nbSujetMax === 0 ||
        body.nbMessageMin === 0 ||
        body.nbMessageMax === 0 ||
        body.nbUser === 0 ||
        body.nbAdmin === 0)
    {

        setResponseStatus(event, 400)
        return {
            error: "Les paramètres de la requête sont invalides"
        }
    } else {
        try {
            const {nbForumMin, nbForumMax, nbSujetMin, nbSujetMax, nbMessageMin, nbMessageMax, nbUser, nbAdmin} = body

            const insertQuery = `INSERT INTO users (login, password, admin) VALUES ('admin', '$2b$10$9xOJiLAXiAjigbS95RjS8OYfDIeccFeGqNbnLs2clk6z4tak0A5Ly', 1)`
            await db.execute(insertQuery)
            //generate admins
            for (let i = 0; i < nbAdmin; i++) {
                const login = fakerFR.internet.userName()
                const password = '$2b$10$9xOJiLAXiAjigbS95RjS8OYfDIeccFeGqNbnLs2clk6z4tak0A5Ly'
                const insertQuery = `INSERT INTO users (login, password, admin)
                                     VALUES (?, ?, 1)`
                await db.execute(insertQuery, [login, password])
            }

            //generate users
            for (let i = 0; i < nbUser; i++) {
                const login = fakerFR.internet.userName()
                const password = '$2b$10$L/bQ1F7yOY71wvWCSPzrzOflI.vnAdLyI4nW54REJfFgARSHGVj5m'
                const insertQuery = `INSERT INTO users (login, password, admin)
                                     VALUES (?, ?, 0)`
                await db.execute(insertQuery, [login, password])
            }

            // generate forums
            let nbForum = Math.floor(Math.random() * (nbForumMax - nbForumMin + 1)) + nbForumMin
            console.log('nbForum', nbForum)
            for (let i = 0; i < nbForum; i++) {
                const title = fakerFR.hacker.noun()
                const insertQuery = `INSERT INTO forums (title, author_id) VALUES (?, ?)`
                await db.execute(insertQuery, [title, 1])

                // generate sujets
                let nbSujet = Math.floor(Math.random() * (nbSujetMax - nbSujetMin + 1)) + nbSujetMin
                console.log('nbSujet', nbSujet)
                const [forum] = await db.execute('SELECT * FROM forums ORDER BY id DESC LIMIT 1')
                for (let i = 0; i < nbSujet; i++) {
                    const title = fakerFR.hacker.adjective()
                    const insertQuery = `INSERT INTO sujets (title, date, forum_id) VALUES (?, NOW(), ?)`
                    await db.execute(insertQuery, [title, forum[0].id])

                    // generate messages
                    let nbMessage = Math.floor(Math.random() * (nbMessageMax - nbMessageMin + 1)) + nbMessageMin
                    console.log('nbMessage', nbMessage)
                    const [sujet] = await db.execute('SELECT * FROM sujets ORDER BY id DESC LIMIT 1')
                    const [users] = await db.execute('SELECT * FROM users')
                    for (let i = 0; i < nbMessage; i++) {
                        const content = fakerFR.hacker.phrase()
                        const user = users[Math.floor(Math.random() * users.length)]
                        const insertQuery = `INSERT INTO messages (content, date, sujet_id, author_id) VALUES (?, now(), ?, ?)`
                        await db.execute(insertQuery, [content, sujet[0].id, user.id])
                    }
                }
            }

            setResponseStatus(event, 201)
            return {
                success: true,
                message: `Données générées avec succès.`
            }
        } catch (error) {
            setResponseStatus(event, 500)
            console.error("Erreur lors de la génération des données :", error);
            return {
                success: false,
                message: "Une erreur s'est produite lors de la génération des données.",
                error: error
            };
        }
    }

});