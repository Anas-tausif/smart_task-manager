checkAuth();

document.getElementById("userName").innerText =
  localStorage.getItem("userName");

async function loadSummary() {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/tasks/summary", {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await response.json();

  document.getElementById("totalTasks").innerText = data.total;
  document.getElementById("completedTasks").innerText = data.completed;
  document.getElementById("pendingTasks").innerText = data.pending;
}

loadSummary();