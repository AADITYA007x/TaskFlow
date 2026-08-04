// ===============================
// LOAD DATA
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let projects = JSON.parse(localStorage.getItem("projects")) || [];

// ===============================
// BRAND COLOR PALETTE
// ===============================

const palette = {
  primary: "#4F46E5",
  secondary: "#06B6D4",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  purple: "#8B5CF6",
};

// ===============================
// TASK STATUS DATA
// ===============================

let todo = 0;

let progress = 0;

let completed = 0;

tasks.forEach((task) => {
  if (task.status === "Todo") {
    todo++;
  } else if (task.status === "In Progress") {
    progress++;
  } else if (task.status === "Completed") {
    completed++;
  }
});

// ===============================
// PRIORITY DATA
// ===============================

let high = 0;

let medium = 0;

let low = 0;

tasks.forEach((task) => {
  if (task.priority === "High") {
    high++;
  } else if (task.priority === "Medium") {
    medium++;
  } else if (task.priority === "Low") {
    low++;
  }
});

// ===============================
// PROJECT DATA
// ===============================

let active = 0;

let completeProjects = 0;

let planning = 0;

projects.forEach((project) => {
  if (project.status === "Active") {
    active++;
  } else if (project.status === "Completed") {
    completeProjects++;
  } else {
    planning++;
  }
});

// ===============================
// THEME-AWARE COLORS
// ===============================

function isDarkMode() {
  return document.body.classList.contains("dark-mode");
}

function textColor() {
  return isDarkMode() ? "#e2e8f0" : "#1E293B";
}

function gridColor() {
  return isDarkMode() ? "#334155" : "#e2e8f0";
}

// ===============================
// BUILD CHARTS
// ===============================

const taskStatusChart = new Chart(document.getElementById("taskStatusChart"), {
  type: "pie",

  data: {
    labels: ["Todo", "In Progress", "Completed"],

    datasets: [
      {
        data: [todo, progress, completed],
        backgroundColor: [palette.secondary, palette.warning, palette.success],
        borderColor: isDarkMode() ? "#1e293b" : "#ffffff",
        borderWidth: 2,
      },
    ],
  },

  options: {
    plugins: {
      legend: {
        labels: { color: textColor() },
      },
    },
  },
});

const priorityChart = new Chart(document.getElementById("priorityChart"), {
  type: "bar",

  data: {
    labels: ["High", "Medium", "Low"],

    datasets: [
      {
        label: "Tasks",
        data: [high, medium, low],
        backgroundColor: [palette.danger, palette.warning, palette.success],
        borderRadius: 8,
      },
    ],
  },

  options: {
    plugins: {
      legend: {
        labels: { color: textColor() },
      },
    },
    scales: {
      x: {
        ticks: { color: textColor() },
        grid: { color: gridColor() },
      },
      y: {
        ticks: { color: textColor() },
        grid: { color: gridColor() },
        beginAtZero: true,
      },
    },
  },
});

const projectChart = new Chart(document.getElementById("projectChart"), {
  type: "doughnut",

  data: {
    labels: ["Planning", "Active", "Completed"],

    datasets: [
      {
        data: [planning, active, completeProjects],
        backgroundColor: [palette.primary, palette.secondary, palette.success],
        borderColor: isDarkMode() ? "#1e293b" : "#ffffff",
        borderWidth: 2,
      },
    ],
  },

  options: {
    plugins: {
      legend: {
        labels: { color: textColor() },
      },
    },
  },
});

// ===============================
// LIVE THEME SWITCHING
// Re-colors chart text/legends/grid
// the moment the navbar toggle is
// clicked, no reload needed.
// ===============================

window.addEventListener("themechange", () => {
  const charts = [taskStatusChart, priorityChart, projectChart];

  charts.forEach((chart) => {
    if (chart.options.plugins?.legend?.labels) {
      chart.options.plugins.legend.labels.color = textColor();
    }

    if (chart.options.scales) {
      if (chart.options.scales.x) {
        chart.options.scales.x.ticks.color = textColor();
        chart.options.scales.x.grid.color = gridColor();
      }

      if (chart.options.scales.y) {
        chart.options.scales.y.ticks.color = textColor();
        chart.options.scales.y.grid.color = gridColor();
      }
    }

    const newBorder = isDarkMode() ? "#1e293b" : "#ffffff";

    if (chart.data.datasets[0].borderColor) {
      chart.data.datasets[0].borderColor = newBorder;
    }

    chart.update();
  });
});