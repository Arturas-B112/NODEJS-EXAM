const form = document.getElementById("register-form");
const firstPasswordInput = document.getElementById("password");
const secondPasswordInput = document.getElementById("password-repeated");
const output = document.getElementById("output");

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

  if (firstPasswordInput.value === secondPasswordInput.value) {
    await registerUser(paylaod);
    window.location.replace("./login.html");
  } else {
    const errorMessage = document.createElement("h3");
    errorMessage.textContent = "";
    errorMessage.textContent = "Something went wrong. Please try again.";
    output.append(errorMessage);
    const inputs = document.querySelectorAll(
      "#name, #email, #password, #password-repeated"
    );
    inputs.forEach((input) => (input.value = ""));
  }
});
