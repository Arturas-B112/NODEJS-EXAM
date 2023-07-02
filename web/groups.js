const token = Cookies.get("token");
const output = document.getElementById("cards-container");
const userGroupsBtn = document.getElementById("user-groups-btn");
const allGroupsBtn = document.getElementById("all-groups-btn");
const createGroupForm = document.getElementById("create-group-form");
const joinGroupForm = document.getElementById("join-group-form");
const errorOutput = document.getElementById("error-output");

if (!token) {
  window.location.replace("./login.html");
}

const API_BASE = "http://localhost:8080";

const getUserGroups = async () => {
  try {
    const response = await fetch(`${API_BASE}/accounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getAllGroups = async () => {
  try {
    const response = await fetch(`${API_BASE}/groups`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const createGroup = async (payload) => {
  try {
    const response = await fetch(`${API_BASE}/groups`, {
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

const joinGroup = async (payload) => {
  try {
    const response = await fetch(`${API_BASE}/accounts`, {
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
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "This group does not exist";
    errorOutput.append(errorMessage);
  }
};

const renderGroups = (groups) => {
  groups.forEach((group) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("group-card");

    const idHeading = document.createElement("h3");
    const groupName = document.createElement("p");

    idHeading.textContent = `ID: ${group.id}`;
    groupName.textContent = group.name;

    cardContainer.append(idHeading, groupName);
    output.append(cardContainer);
  });
};

userGroupsBtn.addEventListener("click", async () => {
  const groups = await getUserGroups();
  output.textContent = "";
  errorOutput.textContent = "";
  renderGroups(groups);
});

allGroupsBtn.addEventListener("click", async () => {
  const groups = await getAllGroups();
  output.textContent = "";
  errorOutput.textContent = "";
  renderGroups(groups);
});

createGroupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: e.target.name.value,
  };

  errorOutput.textContent = "";
  createGroup(payload);

  e.target.name.value = "";
});

joinGroupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    group_id: e.target.id.value,
  };

  errorOutput.textContent = "";
  joinGroup(payload);

  e.target.id.value = "";
});
