const toggleSwitch = document.querySelector('.checkbox');
const body = document.body;
const logo = document.querySelector('.logo'); // Target the logo image on the portfolio page

// Check localStorage for the current theme
const currentTheme = localStorage.getItem('theme');

// Function to update the logo image based on theme
const updateLogo = (theme) => {
  if (logo) {
    if (theme === 'dark') {
      logo.src = '/assets/logo-dark.png';
    } else {
      logo.src = '/assets/logo-light.png';
    }
  }
};

// Apply the theme from localStorage
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  toggleSwitch.checked = true;
  updateLogo('dark');
} else {
  body.classList.remove('dark-mode');
  toggleSwitch.checked = false;
  updateLogo('light');
}

// Toggle dark mode on checkbox change
toggleSwitch.addEventListener('change', () => {
  if (toggleSwitch.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    updateLogo('dark');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    updateLogo('light');
  }
});

// Removed the forced redirection on popstate to allow natural browser navigation
