const toggleSwitch = document.querySelector('.checkbox');
const body = document.body;
const arrow = document.getElementById('arrow');

// Function to apply the theme and log the action
const applyTheme = (theme) => {
  console.log(`Applying theme: ${theme}`); // Debugging: Log theme being applied
  if (theme === 'dark') {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
  toggleSwitch.checked = theme === 'dark'; // Sync the checkbox state with the theme
};

// Check for system preference for dark mode
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
console.log("System prefers dark mode:", systemPrefersDark); // Debugging: Check system preference

// Check localStorage for the current theme
let currentTheme = localStorage.getItem('theme');

// If no theme is set in localStorage, use system preference
if (!currentTheme) {
  currentTheme = systemPrefersDark ? 'dark' : 'light';
  console.log(`No localStorage theme found, setting theme based on system preference: ${currentTheme}`);
  localStorage.setItem('theme', currentTheme); // Save the system preference in localStorage initially
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

// Smooth transition logic for the arrow click
const smoothTransitionToPortfolio = () => {
  body.style.transition = 'opacity 0.5s ease'; // Fade out effect
  body.style.opacity = '0'; // Set opacity to 0 (fade-out)

  setTimeout(() => {
    window.location.assign('portfolio.html'); // Redirect after the fade-out completes
  }, 500); // Match the fade-out duration with the delay
};

// Detect click event on the arrow
arrow.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default link behavior
  smoothTransitionToPortfolio();  // Trigger the smooth transition to portfolio.html
});
