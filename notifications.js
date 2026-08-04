// ===============================
// LOAD DATA
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let projects = JSON.parse(localStorage.getItem("projects")) || [];

// ===============================
// ELEMENT
// ===============================

const notificationBox = document.getElementById("notifications");

// ===============================
// SHOW NOTIFICATIONS
// ===============================

function showNotifications() {
  notificationBox.innerHTML = "";

  let notifications = [];

  let today = new Date();

  today.setHours(0, 0, 0, 0);

  // TASK CHECK

  tasks.forEach((task) => {
    if (task.date) {
      let deadline = new Date(task.date);

      deadline.setHours(0, 0, 0, 0);

      if (task.status !== "Completed" && deadline < today) {
        notifications.push({
          title: "Overdue Task",

          message: `${task.title} is overdue.`,

          type: "danger",

          icon: "fa-circle-exclamation",
        });
      } else if (deadline.getTime() === today.getTime()) {
        notifications.push({
          title: "Due Today",

          message: `${task.title} is due today.`,

          type: "warning",

          icon: "fa-clock",
        });
      }
    }

    if (task.status === "Completed") {
      notifications.push({
        title: "Task Completed",

        message: `${task.title} has been completed.`,

        type: "success",

        icon: "fa-circle-check",
      });
    }
  });

  // PROJECT CHECK

  projects.forEach((project) => {
    if (project.status === "Completed") {
      notifications.push({
        title: "Project Completed",

        message: `${project.name} project completed.`,

        type: "success",

        icon: "fa-folder-open",
      });
    }
  });

  // EMPTY STATE

  if (notifications.length === 0) {
    notificationBox.innerHTML = `

        <div class="notification-card info">

        <i class="fa-solid fa-bell"></i>

        <div>

        <h3>
        No Notifications
        </h3>

        <p>
        Everything is up to date.
        </p>

        </div>

        </div>

        `;

    return;
  }

  // DISPLAY

  notifications.forEach((notification) => {
    notificationBox.innerHTML += `


        <div class="notification-card ${notification.type}">


            <i class="fa-solid ${notification.icon}">
            </i>


            <div>


                <h3>
                ${notification.title}
                </h3>


                <p>
                ${notification.message}
                </p>


            </div>


        </div>


        `;
  });
}

// ===============================
// INITIAL LOAD
// ===============================

showNotifications();
