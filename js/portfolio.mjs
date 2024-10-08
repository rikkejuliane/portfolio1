const toggleSwitch = document.querySelector('.checkbox');
const body = document.body;
const logo = document.querySelector('.logo');
const navLinks = document.querySelectorAll('.nav-links a'); // Target all navigation links
const sections = document.querySelectorAll('section'); // Target all sections

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

// Smooth scrolling with custom offset for anchor links
document.querySelectorAll('.scroll-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior

        const targetId = this.getAttribute('href').substring(1); // Get the target section ID
        const targetSection = document.getElementById(targetId);

        // Calculate the top position of the section relative to the page
        const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset;

        // Define the offset (e.g., 100px above the section)
        const offset = 100;

        // Scroll to the position with an offset, leaving space above the section
        window.scrollTo({
            top: sectionTop - offset,
            behavior: 'smooth'  // Enable smooth scrolling
        });
    });
});

// Intersection Observer to detect which section is in view and activate the corresponding link
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove 'active' class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add 'active' class to the corresponding nav link
            const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, {
    threshold: [0.1, 0.5],  // Check if 20%-50% of the section is in view
    rootMargin: "0px 0px -38% 0px" // Prevent the observer from jumping back for the last section
});

// Observe each section to track scrolling
sections.forEach(section => {
    observer.observe(section);
});
