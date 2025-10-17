// Navbar
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const text = "Learn To Become Top 1%";
const typingElement = document.getElementById("typingText");
let index = 0;

function type() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 95); // typing speed
  } else {
    setTimeout(() => {
      typingElement.innerHTML = ""; // clear text
      index = 0; // reset index
      type(); // restart typing
    }, 1000); // delay before restarting
  }
}

document.addEventListener("DOMContentLoaded", type);

document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('userData');
  
  // If user not logged in
  if (!user) {
    // Disable access to buttons/links for PYQ, Notes, Upload
    const protectedLinks = document.querySelectorAll('#protected-link');
    protectedLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginRequiredModal();
      });
    });

    // Change Profile icon to Get Started button
    const profileContainer = document.getElementById('profileContainer');
    profileContainer.innerHTML = `<a href="/Login/login.html" class="bg-indigo-600 text-white px-4 py-2 rounded-full">Get Started</a>`;
  } else {
    // User is logged in, show profile icon
    const profileContainer = document.getElementById('profileContainer');
    const userData = JSON.parse(user);
    profileContainer.innerHTML = `
      <a href="/Profile/profile.html" class="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-full text-white flex items-center justify-center hover:scale-105 transition transform duration-200 shadow-md" title="Profile">
        <i class="ri-user-line text-xl"></i>
      </a>
    `;
  }
});

function showLoginRequiredModal() {
  const modal = document.getElementById('loginModal');
  modal.classList.remove('hidden');

  document.getElementById('closeLoginModal').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}
const protectedLinks = document.querySelectorAll('.protected-link');
protectedLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (!user) {
      e.preventDefault();
      showLoginRequiredModal();
    }
  });
});
// Function to check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('userData') !== null;
}

// Navbar profile container
const navProfileContainer = document.getElementById('navProfileContainer');

// Render function
function renderNavbarProfile() {
  navProfileContainer.innerHTML = ''; // clear existing content
  if (isLoggedIn()) {
    // Show profile icon
    const profileLink = document.createElement('a');
    profileLink.href = '/Profile/profile.html';
    profileLink.className =
      'bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-full text-white flex items-center justify-center hover:scale-105 transition transform duration-200 shadow-md';
    profileLink.title = 'Profile';
    profileLink.innerHTML = '<i class="ri-user-line text-xl"></i>';
    navProfileContainer.appendChild(profileLink);
  } else {
    // Show Get Started button
    const getStartedBtn = document.createElement('a');
    getStartedBtn.href = '/Login/login.html';
    getStartedBtn.className =
      'bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition';
    getStartedBtn.textContent = 'Get Started';
    navProfileContainer.appendChild(getStartedBtn);
  }
}

// Call it on page load
renderNavbarProfile();
