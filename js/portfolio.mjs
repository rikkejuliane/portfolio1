const toggleSwitch = document.querySelector('.checkbox');
const body = document.body;
const logo = document.querySelector('.logo');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

// Function to apply the theme and update the logo
const applyTheme = (theme) => {
  console.log(`Applying theme: ${theme}`); // Debugging: Log the applied theme
  body.classList.toggle('dark-mode', theme === 'dark');
  toggleSwitch.checked = theme === 'dark'; // Sync the checkbox state with the theme
  logo.src = theme === 'dark' ? '/assets/logo-dark.png' : '/assets/logo-light.png';
};

// Check for system preference for dark mode
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
console.log("System prefers dark mode:", systemPrefersDark); // Debugging: Check system preference

// Check localStorage for the current theme
let currentTheme = localStorage.getItem('theme');

// If no theme is set in localStorage, use system preference
if (!currentTheme) {
  currentTheme = systemPrefersDark ? 'dark' : 'light';  // Use system preference if no localStorage theme
  console.log(`No localStorage theme found, setting theme based on system preference: ${currentTheme}`);
}

// Apply the initial theme
applyTheme(currentTheme);

// Add an event listener to detect changes in system dark mode preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const newPrefersDark = e.matches;
  console.log("System dark mode preference changed:", newPrefersDark); // Debugging: Detect changes in preference
  if (!localStorage.getItem('theme')) { // Only apply if no manual theme is set
    applyTheme(newPrefersDark ? 'dark' : 'light');
  }
});

// Toggle dark mode on checkbox change
toggleSwitch.addEventListener('change', () => {
  const newTheme = toggleSwitch.checked ? 'dark' : 'light';
  console.log(`User switched theme to: ${newTheme}`); // Debugging: Log toggle switch change
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme); // Save the user's preference to localStorage
});

// Smooth scrolling for anchor links (unchanged)
document.querySelectorAll('.scroll-link').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
    const offset = 100;
    window.scrollTo({
      top: sectionTop - offset,
      behavior: 'smooth'
    });
  });
});

// Intersection Observer to detect section in view (unchanged)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, {
  threshold: [0.05, 0.5],
  rootMargin: "-38% 0px -38% 0px"
});

sections.forEach(section => observer.observe(section));






// Fun console log Easter Egg
console.log(`
%c
██   ██ ███████ ██    ██     ██    ██  ██████  ██    ██ ██ 
██   ██ ██       ██  ██       ██  ██  ██    ██ ██    ██ ██ 
███████ █████     ████         ████   ██    ██ ██    ██ ██ 
██   ██ ██         ██           ██    ██    ██ ██    ██    
██   ██ ███████    ██           ██     ██████   ██████  ██
`, 'color:#6A44E3;')
console.log('%c Designed and Built by Rikke Juliane', 'color: #6A44E3; font-size: 16px; font-weight: bold;');