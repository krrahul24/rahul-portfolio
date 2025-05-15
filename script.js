// Import translations
import enTranslations from './assets/translations/en.js';
import hiTranslations from './assets/translations/hi.js';

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Visitor Counter Implementation
    const updateVisitorCount = async () => {
        try {
            // Using a more unique namespace based on your domain
            const response = await fetch('https://api.countapi.xyz/hit/rahul-kumar-portfolio.netlify.app/visits');
            const data = await response.json();
            
            const visitsElement = document.getElementById('visits');
            if (visitsElement) {
                visitsElement.classList.remove('animate');
                visitsElement.textContent = data.value.toLocaleString();
                visitsElement.classList.add('animate');
            }
        } catch (error) {
            console.error('Error updating visitor count:', error);
        }
    };

    // Call the visitor counter function
    updateVisitorCount();

    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize language
    initializeLanguage();

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.backgroundColor = 'rgba(31, 41, 55, 0.98)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.backgroundColor = 'rgba(31, 41, 55, 0.95)';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('fade-in');
                    }, 10);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });
        });
    });

    // Explore More Projects functionality
    const exploreMoreBtn = document.getElementById('exploreMore');
    const hiddenProjects = document.querySelector('.hidden-projects');
    
    if (exploreMoreBtn && hiddenProjects) {
        exploreMoreBtn.addEventListener('click', () => {
            const isHidden = hiddenProjects.style.display === 'none' || !hiddenProjects.style.display;
            
            if (isHidden) {
                // Show projects
                hiddenProjects.style.display = 'flex';
                setTimeout(() => {
                    hiddenProjects.classList.add('show');
                    exploreMoreBtn.classList.add('expanded');
                    exploreMoreBtn.querySelector('span').textContent = 'Show Less';
                }, 10);
            } else {
                // Hide projects
                hiddenProjects.classList.remove('show');
                exploreMoreBtn.classList.remove('expanded');
                exploreMoreBtn.querySelector('span').textContent = 'Explore More Projects';
                setTimeout(() => {
                    hiddenProjects.style.display = 'none';
                }, 500); // Match this with CSS transition duration
            }
        });
    }

    // Animate skill bars on scroll
    const animateSkills = () => {
        const skillBars = document.querySelectorAll('.progress-bar');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };

    // Initialize skill animations
    animateSkills();
});

// Contact form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For demo purposes, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Typing animation for hero section
const typeWriter = () => {
    const text = "Full Stack Developer";
    const speed = 50;
    let i = 0;
    const target = document.querySelector('.text-gradient');
    
    if (target) {
        target.textContent = '';
        const typing = () => {
            if (i < text.length) {
                target.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        };
        typing();
    }
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    animateSkills();
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Dark mode toggle (optional feature)
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Handle form file upload for resume
const handleFileUpload = (input) => {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Handle the uploaded file
            console.log('File uploaded:', file.name);
        };
        reader.readAsDataURL(file);
    }
};

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Animate the icon
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0)';
        }, 300);
    });
});

// Language switching functionality
const translations = {
    en: enTranslations,
    hi: hiTranslations
};

let currentLang = localStorage.getItem('language') || 'en';

function initializeLanguage() {
    // Set initial language
    document.documentElement.lang = currentLang;
    updateLanguageButton();
    translatePage();

    // Add language toggle event listener
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
}

function updateLanguageButton() {
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = currentLang.toUpperCase();
    }
}

function toggleLanguage() {
    // Toggle between English and Hindi
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    
    // Save preference
    localStorage.setItem('language', currentLang);
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
    
    // Update button text
    updateLanguageButton();
    
    // Translate page
    translatePage();
}

function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[currentLang], key);
        
        if (translation) {
            // Add loading class
            element.classList.add('loading');
            
            // Update text after a short delay for animation
            setTimeout(() => {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
                element.classList.remove('loading');
            }, 150);
        }
    });
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((p, c) => p && p[c], obj);
} 