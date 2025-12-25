const pool = require("../config/db");

const createUser = async (user) => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
  `;

  return pool.query(query, [
    user.name,
    user.email,
    user.password,
    user.role,
  ]);
};

const findUserByEmail = async (email) => {
  return pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]   // ✅ MUST be array
  );
};

module.exports = {
  createUser,
  findUserByEmail,
};
