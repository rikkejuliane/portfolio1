const toggleSwitch = document.querySelector(".checkbox");
const body = document.body;
const arrow = document.getElementById("arrow");

// Function to apply the theme and log the action
const applyTheme = (theme) => {
  if (theme === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
  toggleSwitch.checked = theme === "dark";
};

// Check for system preference for dark mode
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
let currentTheme = localStorage.getItem("theme");

if (!currentTheme) {
  currentTheme = systemPrefersDark ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);
}

applyTheme(currentTheme);

// Add an event listener to detect changes in system dark mode preference
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const newPrefersDark = e.matches;
    if (!localStorage.getItem("theme")) {
      applyTheme(newPrefersDark ? "dark" : "light");
    }
  });

// Toggle dark mode on checkbox change
toggleSwitch.addEventListener("change", () => {
  const newTheme = toggleSwitch.checked ? "dark" : "light";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// Smooth transition logic for the arrow click
const smoothTransitionToPortfolio = () => {
  body.style.transition = "opacity 0.5s ease";
  body.style.opacity = "0";

  setTimeout(() => {
    window.location.assign("portfolio.html");
  }, 500);
};

// Detect click event on the arrow
arrow.addEventListener("click", (e) => {
  e.preventDefault();
  smoothTransitionToPortfolio();
});
