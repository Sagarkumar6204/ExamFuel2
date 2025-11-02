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

document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("userData");

  // If user not logged in
  if (!user) {
    // Disable access to buttons/links for PYQ, Notes, Upload
    const protectedLinks = document.querySelectorAll("#protected-link");
    protectedLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        showLoginRequiredModal();
      });
    });

    // Change Profile icon to Get Started button
    const profileContainer = document.getElementById("profileContainer");
    profileContainer.innerHTML = `<a href="/Login/login.html" class="bg-indigo-600 text-white px-4 py-2 rounded-full">Get Started</a>`;
  } else {
    // User is logged in, show profile icon
    const profileContainer = document.getElementById("profileContainer");
    const userData = JSON.parse(user);
    profileContainer.innerHTML = `
      <a href="/Profile/profile.html" class="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-full text-white flex items-center justify-center hover:scale-105 transition transform duration-200 shadow-md" title="Profile">
        <i class="ri-user-line text-xl"></i>
      </a>
    `;
  }
});

function showLoginRequiredModal() {
  const modal = document.getElementById("loginModal");
  modal.classList.remove("hidden");

  document.getElementById("closeLoginModal").addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}
// const protectedLinks = document.querySelectorAll('.protected-link');
// protectedLinks.forEach(link => {
//   link.addEventListener('click', (e) => {
//     if (!user) {
//       e.preventDefault();
//       showLoginRequiredModal();
//     }
//   });
// });

// Function to check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("userData") !== null;
}

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
      "bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-full text-white flex items-center justify-center hover:scale-105 transition transform duration-200 shadow-md";
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

// Chat Bot

// --- Element references ---
const promptEl = document.querySelector("#prompt");
const btn = document.querySelector("#btn");
const chatContainer = document.querySelector("#chat-container");
const chatWrapper = document.querySelector("#chatWrapper");
const chatToggle = document.querySelector("#chatToggle");
const closeChat = document.querySelector("#closeChat");

// --- Open / Close Chat Animation ---
chatToggle.addEventListener("click", () => {
  chatWrapper.style.display = "flex";
  chatToggle.style.display = "none";
});

closeChat.addEventListener("click", () => {
  chatWrapper.style.display = "none";
  chatToggle.style.display = "flex";
});

// --- Append Message Utility ---
function appendMessage(text, cls) {
  const div = document.createElement("div");
  div.className = cls;
  div.textContent = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// --- Send Message Function ---
async function sendMessage(message) {
  // show user message
  appendMessage(message, "user-chat");

  // show loading message
  const loadingEl = document.createElement("div");
  loadingEl.className = "ai-chat";
  loadingEl.textContent = "Typing...";
  chatContainer.appendChild(loadingEl);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  try {
    //add render link

    const resp = await fetch(`${CONFIG.CHAT_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await resp.json();
    // remove loading
    loadingEl.remove();

    if (!resp.ok) {
      appendMessage("Error: " + (data.error || resp.statusText), "ai-chat");
      console.error("Backend error", data);
      return;
    }

    appendMessage(data.reply || "No reply", "ai-chat");
  } catch (err) {
    loadingEl.remove();
    appendMessage("Network error: " + err.message, "ai-chat");
    console.error("Fetch error:", err);
  }
}

// --- Input Handlers ---
promptEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const txt = promptEl.value.trim();
    if (!txt) return;
    promptEl.value = "";
    sendMessage(txt);
  }
});

btn.addEventListener("click", () => {
  const txt = promptEl.value.trim();
  if (!txt) return;
  promptEl.value = "";
  sendMessage(txt);
});
