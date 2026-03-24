checkAuth();

const token = localStorage.getItem("token");
const tableBody = document.getElementById("taskTableBody");

// ================= LOAD TASKS =================
async function loadTasks() {
  const response = await fetch("/api/tasks", {
    headers: { "Authorization": "Bearer " + token }
  });

  const tasks = await response.json();
  tableBody.innerHTML = "";

  tasks.forEach(task => {
    const row = document.createElement("tr");

    if (task.status === "completed") {
      row.classList.add("completed-row");
    }

    row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.description || ""}</td>
      <td>${task.due_date || ""}</td>
      <td>${task.status}</td>
      <td>
        <button onclick="toggleStatus(${task.id}, '${task.status}')">Toggle</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// ================= ADD TASK =================
async function addTask(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const due_date = document.getElementById("due_date").value;

  await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ title, description, due_date })
  });

  document.getElementById("taskForm").reset();
  loadTasks();
}

// ================= TOGGLE STATUS =================
async function toggleStatus(id, currentStatus) {
  const newStatus = currentStatus === "pending" ? "completed" : "pending";

  await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ status: newStatus })
  });

  loadTasks();
}

// ================= DELETE =================
async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  loadTasks();
}

loadTasks();