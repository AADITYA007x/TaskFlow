const lightBtn = document.getElementById("lightMode");

const darkBtn = document.getElementById("darkMode");

function syncNavbarToggle() {
  const navToggle = document.getElementById("themeToggle");

  if (navToggle && typeof applyToggleIcon === "function") {
    applyToggleIcon(navToggle);
  }
}

function setDarkMode() {
  document.body.classList.add("dark-mode");

  localStorage.setItem("theme", "dark");

  syncNavbarToggle();
}

function setLightMode() {
  document.body.classList.remove("dark-mode");

  localStorage.setItem("theme", "light");

  syncNavbarToggle();
}

darkBtn.addEventListener("click", setDarkMode);

lightBtn.addEventListener("click", setLightMode);

// Load saved theme (theme.js already applied the class; this just
// keeps the settings page state/icons consistent on load)

let theme = localStorage.getItem("theme");

if (theme === "dark") {
  document.body.classList.add("dark-mode");
}

document.addEventListener("DOMContentLoaded", syncNavbarToggle);

// ===============================
// CURRENT PLAN
// ===============================

function showCurrentPlan() {
  const planNameEl = document.getElementById("currentPlanName");
  const manageBtn = document.getElementById("managePlanBtn");

  if (!planNameEl) return;

  const plan = localStorage.getItem("currentPlan") || "Starter";

  planNameEl.textContent = plan;

  if (manageBtn) {
    manageBtn.textContent = plan === "Starter" ? "Upgrade Plan" : "Manage Plan";
  }
}

document.addEventListener("DOMContentLoaded", showCurrentPlan);