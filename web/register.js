const form = document.getElementById("register-form");
const firstPasswordInput = document.getElementById("password");
const secondPasswordInput = document.getElementById("password-repeated");

const API_BASE = "http://localhost:8080";

const registerUser = async (payload) => {
  try {
    const response = await fetch(`${API_BASE}/register`, {
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

  const paylaod = {
    full_name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };

  const data = await registerUser(paylaod);
  if (firstPasswordInput.value === secondPasswordInput.value && data.token) {
    window.location.replace("./login.html");
  }
});
