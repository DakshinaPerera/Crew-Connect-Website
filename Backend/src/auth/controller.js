const pool = require('../../db'); 
const queries = require('./queries');

//Auth
const adminLoginController = async (req, res) => {
  const { admin_username, admin_password } = req.body; 

  if (!admin_username || !admin_password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {

    const result = await pool.query(queries.checkUserQuery, [admin_username, admin_password]);

    if (result.rows.length > 0) {
      return res.status(200).json({ message: 'Login successful', user: result.rows[0] });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};




module.exports = { adminLoginController };
