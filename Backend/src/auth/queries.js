const checkUserQuery = `
  SELECT * 
  FROM admin 
  WHERE admin_username = $1 AND admin_password = $2;
`;

module.exports = { checkUserQuery };