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







// Navbar profile container
const navProfileContainer = document.getElementById("navProfileContainer");

// Render function
function renderNavbarProfile() {
  navProfileContainer.innerHTML = ""; // clear existing content
  if (isLoggedIn()) {
    // Show profile icon
    const profileLink = document.createElement("a");
    profileLink.href = "/Profile/profile.html";
    profileLink.className =
      "bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1 rounded-full text-white flex items-center justify-center hover:scale-105 transition transform duration-200 shadow-md";
    profileLink.title = "Profile";
    profileLink.innerHTML = '<i class="ri-user-line text-xl"></i>';
    navProfileContainer.appendChild(profileLink);
  } else {
    // Show Get Started button
    const getStartedBtn = document.createElement("a");
    getStartedBtn.href = "/Login/login.html";
    getStartedBtn.className =
      "bg-indigo-700 text-white px-5 py-2 rounded-lg hover:bg-indigo-800";
    getStartedBtn.textContent = "Log In";
    navProfileContainer.appendChild(getStartedBtn);
  }
}

//For Phones
function renderPhoneNavbarProfile() {
  // navProfileContainer.innerHTML = ""; // clear existing content
  if (isLoggedIn()) {
    // Show profile icon
    const phoneProfileLink = document.createElement("a");
    phoneProfileLink.href = "/Profile/profile.html";
    phoneProfileLink.className =
      "bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-full text-white flex items-center justify-center hover:scale-105 transition transform duration-200 shadow-md";
    phoneProfileLink.title = "Profile";
    phoneProfileLink.innerHTML = '<i class="ri-user-line text-xl"></i>';
    mobileMenu.appendChild(phoneProfileLink);
  } else {
    // Show Get Started button
    const PhoneGetStartedBtn = document.createElement("a");
    PhoneGetStartedBtn.href = "/Login/login.html";
    PhoneGetStartedBtn.className =
      "bg-indigo-700 w-fit text-white px-5 py-2 rounded-lg hover:bg-indigo-800";
    PhoneGetStartedBtn.textContent = "Log In";
    mobileMenu.appendChild(PhoneGetStartedBtn);
  }
}

// Call it on page load
renderNavbarProfile();
renderPhoneNavbarProfile();
