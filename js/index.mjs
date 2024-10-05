const toggleSwitch = document.querySelector('.checkbox');
const body = document.body;
const arrow = document.getElementById('arrow'); // Arrow button for the scroll transition

// Check localStorage for the current theme
const currentTheme = localStorage.getItem('theme');

// Apply the theme from localStorage
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  toggleSwitch.checked = true;
} else {
  body.classList.remove('dark-mode');
  toggleSwitch.checked = false;
}

// Toggle dark mode on checkbox change
toggleSwitch.addEventListener('change', () => {
  if (toggleSwitch.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});

// Function to trigger fade-out and navigate to portfolio.html
const smoothTransitionToPortfolio = () => {
  // Add fade-out effect
  body.style.transition = 'opacity 0.5s ease';
  body.style.opacity = '0';

  // Wait for the fade-out to complete, then redirect using location.assign
  setTimeout(() => {
    window.location.assign('portfolio.html'); // Ensure new history entry is created
  }, 500);  // Duration of fade-out (500ms)
};

// Prevent multiple navigation triggers
let navigationTriggered = false;

// Handle scroll completion to navigate to portfolio
const handleScrollEvent = () => {
  if (!navigationTriggered) {
    const scrollThreshold = window.innerHeight * 0.2; // 20% scroll threshold
    if (window.scrollY > scrollThreshold) {
      navigationTriggered = true;
      smoothTransitionToPortfolio();  // Trigger smooth transition to portfolio on scroll
    }
  }
};

// Detect scroll events
window.addEventListener('scroll', handleScrollEvent);
window.addEventListener('wheel', handleScrollEvent);

// Detect click event on the arrow
arrow.addEventListener('click', (e) => {
  e.preventDefault();
  if (!navigationTriggered) {
    navigationTriggered = true;
    smoothTransitionToPortfolio();  // Trigger smooth transition to portfolio on arrow click
  }
});
