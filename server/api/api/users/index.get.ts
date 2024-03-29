//je voudrais import ma connexion à la base de donnée et ma function getListe depuis /serveur/index.ts

import db from '~/server/sql'
export default defineEventHandler(async (event) => {
    return db.getList('users')
});