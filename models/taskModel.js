const db = require("../config/db");

// ================= GET ALL TASKS =================
exports.getTasksByUserId = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

// ================= CREATE TASK =================
exports.createTask = async (userId, title, description, due_date) => {
  const [result] = await db.query(
    "INSERT INTO tasks (user_id, title, description, due_date) VALUES (?, ?, ?, ?)",
    [userId, title, description, due_date]
  );
  return result;
};

// ================= UPDATE TASK =================
exports.updateTask = async (taskId, userId, title, description, status, due_date) => {
  const [result] = await db.query(
    "UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ? AND user_id = ?",
    [title, description, status, due_date, taskId, userId]
  );
  return result;
};

// ================= DELETE TASK =================
exports.deleteTask = async (taskId, userId) => {
  const [result] = await db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [taskId, userId]
  );
  return result;
};

// ================= TASK SUMMARY =================
exports.getTaskSummary = async (userId) => {
  const [total] = await db.query(
    "SELECT COUNT(*) as total FROM tasks WHERE user_id = ?",
    [userId]
  );

  const [completed] = await db.query(
    "SELECT COUNT(*) as completed FROM tasks WHERE user_id = ? AND status = 'completed'",
    [userId]
  );

  const [pending] = await db.query(
    "SELECT COUNT(*) as pending FROM tasks WHERE user_id = ? AND status = 'pending'",
    [userId]
  );

  return {
    total: total[0].total,
    completed: completed[0].completed,
    pending: pending[0].pending
  };
};