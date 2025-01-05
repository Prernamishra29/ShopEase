console.log("Interactive Shoply loaded!");

let currentIndex = 0;
const images = document.querySelectorAll('.hero-img');
const totalImages = images.length;

function showNextImage() {
    images[currentIndex].style.transform = 'translateX(-100%)'; // Hide current image
    currentIndex = (currentIndex + 1) % totalImages; // Loop through images
    images[currentIndex].style.transform = 'translateX(0)'; // Show next image
}

// Initial setup: position first image
images[currentIndex].style.transform = 'translateX(0)';

// Start the slider (change every 3 seconds)
setInterval(showNextImage, 3000);

// Responsive Navbar Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.createElement('button');
    navbarToggle.classList.add('navbar-toggle');
    navbarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    const navbar = document.querySelector('.navbar');
    navbar.parentElement.insertBefore(navbarToggle, navbar);

    navbarToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
});

// Hero Image Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-img');
const slideInterval = setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 3000);

// Add "active" class for the first slide
if (slides.length) slides[currentSlide].classList.add('active');

// Search Functionality
const searchInput = document.querySelector('.search-bar input');
const categoryItems = document.querySelectorAll('.category-item');

searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    categoryItems.forEach((item) => {
        const category = item.querySelector('p').textContent.toLowerCase();
        item.style.display = category.includes(searchText) ? 'block' : 'none';
    });
});

// Add to Cart Interaction
const cartItems = [];
const addToCartButtons = document.querySelectorAll('.deal-card button');

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const dealCard = button.parentElement;
        const productName = dealCard.querySelector('p').textContent;
        const productPrice = dealCard.querySelector('span')?.textContent || 'N/A';

        cartItems.push({ productName, productPrice });
        alert(`${productName} added to your cart!`);
        console.log('Cart Items:', cartItems);
    });
});

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(e.target.getAttribute('href'));
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Dynamic Footer Year
const footerYear = new Date().getFullYear();
document.querySelector('.footer p').innerHTML = `&copy; ${footerYear} Shoply. All rights reserved. | Designed with ❤`;

document.addEventListener("DOMContentLoaded", () => {
    const filterCategory = document.getElementById("filter-category");
    const sortPrice = document.getElementById("sort-price");
    const dealItems = document.getElementById("deal-items");
    const dealCards = Array.from(dealItems.getElementsByClassName("deal-card"));

    // Filter function
    filterCategory.addEventListener("change", () => {
        const selectedCategory = filterCategory.value.toLowerCase();
        dealCards.forEach((card) => {
            const category = card.getAttribute("data-category").toLowerCase();
            card.style.display =
                selectedCategory === "all" || category === selectedCategory
                    ? "block"
                    : "none";
        });
    });

    // Sort function
    sortPrice.addEventListener("change", () => {
        const selectedOption = sortPrice.value;
        const sortedCards = dealCards.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute("data-price"));
            const priceB = parseFloat(b.getAttribute("data-price"));
            if (selectedOption === "asc") return priceA - priceB;
            if (selectedOption === "desc") return priceB - priceA;
            return 0;
        });

        // Clear and append sorted cards
        dealItems.innerHTML = "";
        sortedCards.forEach((card) => dealItems.appendChild(card));
    });
});

// Toggle User Icon Dropdown
document.querySelector('.user-icon').addEventListener('click', function() {
    this.classList.toggle('active');
});

// Open Sign In Modal
function openSignInModal() {
    document.getElementById('sign-in-modal').style.display = 'block';
}

// Close Sign In Modal
function closeSignInModal() {
    document.getElementById('sign-in-modal').style.display = 'none';
}

// Open Create Account Modal
function openSignUpModal() {
    document.getElementById('sign-up-modal').style.display = 'block';
}

// Close Create Account Modal
function closeSignUpModal() {
    document.getElementById('sign-up-modal').style.display = 'none';
}

// Handle Sign In Form Submission
document.getElementById('sign-in-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('sign-in-email').value;
    const password = document.getElementById('sign-in-password').value;

    const user = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = user.find(u => u.email === email && u.password === password);

    if (existingUser) {
        alert('Sign In Successful');
        localStorage.setItem('loggedInUser', JSON.stringify(existingUser));  // Store logged-in user
        window.location.href = 'index.html';  // Redirect to home page
    } else {
        alert('Invalid credentials');
    }
});

// Handle Create Account Form Submission
document.getElementById('sign-up-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('sign-up-name').value;
    const email = document.getElementById('sign-up-email').value;
    const password = document.getElementById('sign-up-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        alert('Account already exists');
    } else {
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Account Created Successfully');
        closeSignUpModal();
        window.location.href = 'index.html';  // Redirect to home page
    }
});
