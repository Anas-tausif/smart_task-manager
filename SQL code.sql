/* =====================================================
   SMART TASK MANAGER - COMPLETE DATABASE SCRIPT
===================================================== */


/* -------------------------------
   2. CREATE DATABASE
-------------------------------- */
CREATE DATABASE smart_task_manager;

USE smart_task_manager;

/* =====================================================
   3. USERS TABLE
===================================================== */

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
);

/* Index for faster email lookup */
CREATE INDEX idx_users_email ON users(email);


/* =====================================================
   4. TASKS TABLE
===================================================== */

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending','completed') DEFAULT 'pending',
    due_date DATE,
    priority ENUM('low','medium','high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_task
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

/* Index for performance */
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);


/* =====================================================
   5. OPTIONAL: SAMPLE DATA (FOR TESTING)
===================================================== */

/* Insert Sample User
   NOTE: Password below is just example hash
   (Use bcrypt hash from your app in real case)
*/

INSERT INTO users (name, email, password)
VALUES 
('John Doe', 'john@example.com', '$2b$10$examplehashedpassword123456789');

/* Insert Sample Tasks */

INSERT INTO tasks (user_id, title, description, status, due_date, priority)
VALUES
(1, 'Complete Project Report', 'Finish backend API documentation', 'pending', '2026-03-01', 'high'),

(1, 'Design Dashboard UI', 'Improve card styling and responsiveness', 'completed', '2026-02-25', 'medium'),

(1, 'Test Authentication Module', 'Verify JWT and middleware functionality', 'pending', '2026-03-05', 'high'),

(1, 'Prepare Presentation Slides', 'Create Phase 1 PPT slides', 'completed', '2026-02-20', 'low');


/* =====================================================
   6. VERIFY DATA
===================================================== */

SELECT * FROM users;
SELECT * FROM tasks;


/* =====================================================
   7. STORED PROCEDURE (OPTIONAL ADVANCED FEATURE)
   This can impress examiner if mentioned
===================================================== */

DELIMITER //

CREATE PROCEDURE GetTaskSummary(IN userId INT)
BEGIN
    SELECT 
        COUNT(*) AS total_tasks,
        SUM(status = 'completed') AS completed_tasks,
        SUM(status = 'pending') AS pending_tasks
    FROM tasks
    WHERE user_id = userId;
END //

DELIMITER ;


/* =====================================================
   8. VIEW (OPTIONAL ADVANCED FEATURE)
===================================================== */

CREATE VIEW user_task_overview AS
SELECT 
    u.id AS user_id,
    u.name,
    u.email,
    t.id AS task_id,
    t.title,
    t.status,
    t.due_date,
    t.priority
FROM users u
LEFT JOIN tasks t ON u.id = t.user_id;


/* =====================================================
   END OF SCRIPT
===================================================== */