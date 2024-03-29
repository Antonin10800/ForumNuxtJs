import db from '~/server/sql'

export default defineEventHandler(async (event) => {
    return db.getList('sujets')
});