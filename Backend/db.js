const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crewconnect',
    password: 'Kowaski@1652',
    port:5432
});

module.exports = pool;