const db = require("../config/db");

// ================= GET ALL TASKS =================
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const [tasks] = await db.query(
      `SELECT id, title, description, status, due_date, created_at 
       FROM tasks 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(tasks);

  } catch (error) {
    console.error("GET TASKS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= CREATE TASK =================
exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    await db.query(
      `INSERT INTO tasks (user_id, title, description, due_date, status) 
       VALUES (?, ?, ?, ?, 'pending')`,
      [userId, title, description || null, due_date || null]
    );

    res.status(201).json({ message: "Task created successfully" });

  } catch (error) {
    console.error("CREATE TASK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= UPDATE TASK =================
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    const { title, description, due_date, status } = req.body;

    // Check if task exists and belongs to user
    const [existing] = await db.query(
      "SELECT id FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Dynamic update (partial update allowed)
    await db.query(
      `UPDATE tasks 
       SET title = COALESCE(?, title),
           description = COALESCE(?, description),
           due_date = COALESCE(?, due_date),
           status = COALESCE(?, status)
       WHERE id = ? AND user_id = ?`,
      [
        title || null,
        description || null,
        due_date || null,
        status || null,
        taskId,
        userId
      ]
    );

    res.json({ message: "Task updated successfully" });

  } catch (error) {
    console.error("UPDATE TASK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= DELETE TASK =================
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;

    const [existing] = await db.query(
      "SELECT id FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    await db.query(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    res.json({ message: "Task deleted successfully" });

  } catch (error) {
    console.error("DELETE TASK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= TASK SUMMARY (Dashboard + Reports) =================
exports.getTaskSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      `SELECT 
         COUNT(*) AS total,
         SUM(status = 'completed') AS completed,
         SUM(status = 'pending') AS pending
       FROM tasks
       WHERE user_id = ?`,
      [userId]
    );

    res.json({
      total: rows[0].total || 0,
      completed: rows[0].completed || 0,
      pending: rows[0].pending || 0
    });

  } catch (error) {
    console.error("TASK SUMMARY ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};