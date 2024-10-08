const toggleSwitch = document.querySelector('.checkbox');
const body = document.body;
const logo = document.querySelector('.logo');

// Function to update the logo based on the theme
const updateLogo = (theme) => {
    if (logo) {
        logo.src = theme === 'dark' ? '/assets/logo-dark.png' : '/assets/logo-light.png';
    }
};

// Check localStorage for the current theme and apply it
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.toggle('dark-mode', currentTheme === 'dark');
toggleSwitch.checked = currentTheme === 'dark';
updateLogo(currentTheme);

// Toggle dark mode on checkbox change
toggleSwitch.addEventListener('change', () => {
    const newTheme = toggleSwitch.checked ? 'dark' : 'light';
    body.classList.toggle('dark-mode', toggleSwitch.checked);
    localStorage.setItem('theme', newTheme);
    updateLogo(newTheme);
});
