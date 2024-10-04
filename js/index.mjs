const toggleSwitch = document.querySelector('.checkbox');
const body = document.body;
const logo = document.querySelector('.logo'); // Target the logo image

// Check localStorage for the current theme
const currentTheme = localStorage.getItem('theme');

// Function to update the logo image based on theme
const updateLogo = (theme) => {
  if (theme === 'dark') {
    logo.src = '/assets/logo-dark.png'; // Dark mode logo
  } else {
    logo.src = '/assets/logo-light.png'; // Light mode logo
  }
};

// If dark mode is stored, apply it, otherwise keep light mode
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  toggleSwitch.checked = true; // Set the toggle to checked for dark mode
  updateLogo('dark'); // Update logo for dark mode
} else {
  body.classList.remove('dark-mode'); // Ensure light mode is applied by default
  toggleSwitch.checked = false; // Set the toggle to unchecked for light mode
  updateLogo('light'); // Update logo for light mode
}

// Toggle dark mode on checkbox change
toggleSwitch.addEventListener('change', () => {
  if (toggleSwitch.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    updateLogo('dark'); // Switch to dark mode logo
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    updateLogo('light'); // Switch to light mode logo
  }
});
