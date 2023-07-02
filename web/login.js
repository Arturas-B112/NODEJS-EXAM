const form = document.getElementById("register-form");
const output = document.getElementById("output");

const API_BASE = "http://localhost:8080";

const loginUser = async (payload) => {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  const data = await loginUser(payload);
  if (data.token) {
    document.cookie = `token=${data.token}`;
    window.location.replace("./groups.html");
  }
});
