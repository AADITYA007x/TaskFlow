// ===============================
// LOAD DATA
// ===============================

let members = JSON.parse(localStorage.getItem("members")) || [];

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ===============================
// ELEMENTS
// ===============================

const memberName = document.getElementById("memberName");
const memberEmail = document.getElementById("memberEmail");
const memberRole = document.getElementById("memberRole");
const assignedTask = document.getElementById("assignedTask");
const addMemberBtn = document.getElementById("addMember");
const membersContainer = document.getElementById("members");

// ===============================
// LOAD TASK DROPDOWN
// ===============================

function loadTasks() {
  assignedTask.innerHTML = `<option>No Task Assigned</option>`;

  tasks.forEach((task) => {
    assignedTask.innerHTML += `<option value="${task.title}">${task.title}</option>`;
  });
}

// ===============================
// SAVE
// ===============================

function saveMembers() {
  localStorage.setItem("members", JSON.stringify(members));
}

// ===============================
// DISPLAY MEMBERS
// ===============================

function displayMembers() {
  membersContainer.innerHTML = "";

  if (members.length === 0) {
    membersContainer.innerHTML = `<p>No team members added yet.</p>`;
    return;
  }

  members.forEach((member, index) => {
    membersContainer.innerHTML += `

        <div class="member-card">

            <h3>${member.name}</h3>

            <p>${member.email}</p>

            <span class="member-role">${member.role}</span>

            <p><b>Assigned Task:</b> ${member.task}</p>

            <br>

            <button onclick="removeMember(${index})" class="remove-member">
                Remove
            </button>

        </div>

        `;
  });
}

// ===============================
// ADD MEMBER
// ===============================

addMemberBtn.addEventListener("click", () => {
  const name = memberName.value.trim();
  const email = memberEmail.value.trim();

  if (name === "" || email === "") {
    alert("Name and email are required.");
    return;
  }

  members.push({
    name: name,
    email: email,
    role: memberRole.value,
    task: assignedTask.value,
  });

  saveMembers();
  displayMembers();

  memberName.value = "";
  memberEmail.value = "";
});

// ===============================
// REMOVE MEMBER
// ===============================

function removeMember(index) {
  if (confirm("Remove this team member?")) {
    members.splice(index, 1);
    saveMembers();
    displayMembers();
  }
}

// ===============================
// INITIAL LOAD
// ===============================

loadTasks();
displayMembers();