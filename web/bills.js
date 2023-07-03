const id = sessionStorage.getItem("id");
const token = Cookies.get("token");
const output = document.getElementById("output-table");
const form = document.getElementById("add-bill-form");
const logoutBtn = document.getElementById("logout-btn");

const API_BASE = "http://localhost:8080";

const getBills = async () => {
  try {
    const response = await fetch(`${API_BASE}/bills/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const createBill = async (payload) => {
  try {
    const response = await fetch(`${API_BASE}/bills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const renderBillsTable = (bills) => {
  bills.forEach((bill) => {
    const row = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdDescription = document.createElement("td");
    const tdAmount = document.createElement("td");

    tdId.textContent = bill.id;
    tdDescription.textContent = bill.description;
    tdAmount.textContent = `$${bill.amount}`;

    row.append(tdId, tdDescription, tdAmount);
    output.append(row);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const billData = await getBills();
  renderBillsTable(billData);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const payload = {
    group_id: id,
    amount: e.target.amount.value,
    description: e.target.description.value,
  };

  createBill(payload);
  e.target.amount.value = "";
  e.target.description.value = "";
});

logoutBtn.addEventListener("click", () => {
  Cookies.remove("token");
  window.location.replace("./login.html");
});
