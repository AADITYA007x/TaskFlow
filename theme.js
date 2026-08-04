// ===============================
// THEME MANAGER
// Applies the saved theme on every
// page load and wires up the navbar
// toggle button (if present).
// ===============================

(function () {
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    document.body.classList.add("dark-mode");
  }
})();

function applyToggleIcon(btn) {
  const isDark = document.body.classList.contains("dark-mode");

  btn.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  btn.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}

function initThemeToggle() {
  const btn = document.getElementById("themeToggle");

  if (!btn) return;

  applyToggleIcon(btn);

  btn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    applyToggleIcon(btn);

    window.dispatchEvent(
      new CustomEvent("themechange", { detail: { dark: isDark } })
    );
  });
}

document.addEventListener("DOMContentLoaded", initThemeToggle);