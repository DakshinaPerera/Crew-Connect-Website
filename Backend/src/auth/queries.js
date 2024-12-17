// src/auth/queries.js
const checkUserQuery = "SELECT * FROM admin WHERE admin_username = $1 AND admin_password = $2";
const getUserById = "SELECT * FROM admin WHERE admin_id = $1";

module.exports = {
    checkUserQuery,
    getUserById,
};