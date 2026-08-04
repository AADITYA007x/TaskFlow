const lightBtn = document.getElementById("lightMode");

const darkBtn = document.getElementById("darkMode");

function setDarkMode() {
  document.body.classList.add("dark-mode");

  localStorage.setItem("theme", "dark");
}

function setLightMode() {
  document.body.classList.remove("dark-mode");

  localStorage.setItem("theme", "light");
}

darkBtn.addEventListener("click", setDarkMode);

lightBtn.addEventListener("click", setLightMode);

// Load saved theme

let theme = localStorage.getItem("theme");

if (theme === "dark") {
  setDarkMode();
}
