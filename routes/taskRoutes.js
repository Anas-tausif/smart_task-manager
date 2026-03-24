const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

// Get All Tasks (Protected)
router.get("/", authMiddleware, taskController.getTasks);

// Add New Task
router.post("/", authMiddleware, taskController.createTask);

// Update Task
router.put("/:id", authMiddleware, taskController.updateTask);

// Delete Task
router.delete("/:id", authMiddleware, taskController.deleteTask);

// Get Task Summary (for dashboard)
router.get("/summary", authMiddleware, taskController.getTaskSummary);

module.exports = router;