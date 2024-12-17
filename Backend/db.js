const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Kd8hKESu^8BS!8^gf',
    port:5432
});

module.exports = pool;