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
