const toggleSwitch = document.querySelector(".checkbox");
const body = document.body;
const logo = document.querySelector(".logo");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

// Function to apply the theme and update the logo
const applyTheme = (theme) => {
  body.classList.toggle("dark-mode", theme === "dark");
  toggleSwitch.checked = theme === "dark";
  logo.src =
    theme === "dark" ? "/assets/logo-dark.png" : "/assets/logo-light.png";
};

// Check for system preference for dark mode and current theme
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
let currentTheme = localStorage.getItem("theme");

if (!currentTheme) {
  currentTheme = systemPrefersDark ? "dark" : "light";
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

// Smooth scrolling for anchor links (unchanged)
document.querySelectorAll(".scroll-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    const sectionTop =
      targetSection.getBoundingClientRect().top + window.pageYOffset;
    const offset = 100;
    window.scrollTo({
      top: sectionTop - offset,
      behavior: "smooth",
    });
  });
});

// Intersection Observer to detect section in view (unchanged)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `.nav-links a[href="#${entry.target.id}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  },
  {
    threshold: [0.05, 0.5],
    rootMargin: "-38% 0px -38% 0px",
  }
);

sections.forEach((section) => observer.observe(section));

// Hamburger menu and navbar toggle
const hamburgerMenu = document.getElementById("hamburger-menu");
const navbar = document.querySelector(".navbar");
const hamburgerIcon = document.getElementById("hamburger");

// Function to toggle the navbar and hamburger icon
const toggleNavbar = () => {
  navbar.classList.toggle("active");
  hamburgerIcon.classList.toggle("hamburger-active");
};

hamburgerMenu.addEventListener("click", toggleNavbar);

// Get the Lottie arrows and add event listeners for mobile (<600px)
const lightModeArrow = document.getElementById("light-mode-arrow");
const darkModeArrow = document.getElementById("dark-mode-arrow");

const isMobile = () => window.innerWidth <= 600; // Mobile check

// Add event listener for the Light mode Lottie arrow click (only on mobile)
lightModeArrow.addEventListener("click", () => {
  if (isMobile()) {
    toggleNavbar();
  }
});

// Add event listener for the Dark mode Lottie arrow click (only on mobile)
darkModeArrow.addEventListener("click", () => {
  if (isMobile()) {
    toggleNavbar();
  }
});

window.addEventListener("resize", () => {
  if (!isMobile()) {
    navbar.classList.remove("active");
    hamburgerIcon.classList.remove("hamburger-active");
  }
});

// Fun console log Easter Egg
console.log(
  `
%c
██   ██ ███████ ██    ██     ██    ██  ██████  ██    ██ ██ 
██   ██ ██       ██  ██       ██  ██  ██    ██ ██    ██ ██ 
███████ █████     ████         ████   ██    ██ ██    ██ ██ 
██   ██ ██         ██           ██    ██    ██ ██    ██    
██   ██ ███████    ██           ██     ██████   ██████  ██
`,
  "color:#6A44E3;"
);
console.log(
  "%c Designed and Built by Rikke Juliane",
  "color: #6A44E3; font-size: 16px; font-weight: bold;"
);
