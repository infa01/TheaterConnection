const db = require('../config/db');

const getAllTheatres = async () => {
    const [theatres] = await db.query(`
        SELECT *
        FROM theatres
        ORDER BY theatre_id ASC
    `);

    return theatres;
};

module.exports = {
    getAllTheatres
};