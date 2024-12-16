const pool = require('../../db'); 
const queries = require('./queries');

const getEmpAvailableJobs = async (req, res) => {
    try {
        console.log("Hello");
        const results = await pool.query(queries.getAvailableJobs);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching jobs.");
    }
};

module.exports = {
    getEmpAvailableJobs
};