checkAuth();

const token = localStorage.getItem("token");

// ================= LOAD PROFILE =================
async function loadProfile() {
  const response = await fetch("/api/auth/profile", {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const user = await response.json();

  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
}

loadProfile();

// ================= UPDATE PROFILE =================
async function updateProfile(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch("/api/auth/update-profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ name, email })
  });

  alert("Profile updated successfully!");
}

// ================= UPDATE PASSWORD =================
async function updatePassword(event) {
  event.preventDefault();

  const password = document.getElementById("newPassword").value;

  await fetch("/api/auth/update-password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ password })
  });

  alert("Password updated successfully!");
  document.getElementById("passwordForm").reset();
}