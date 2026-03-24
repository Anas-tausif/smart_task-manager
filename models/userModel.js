const db = require("../config/db");

// ================= FIND USER BY EMAIL =================
exports.findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows;
};

// ================= CREATE USER =================
exports.createUser = async (name, email, password) => {
  const [result] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return result;
};

// ================= FIND USER BY ID =================
exports.findUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [id]
  );
  return rows;
};