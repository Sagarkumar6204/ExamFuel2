// 1️⃣ Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('userData') !== null;
}

// 2️⃣ Select all protected links and the overlay
const protectedLinks = document.querySelectorAll('.protected');
const loginOverlay = document.getElementById('loginOverlay');
const closeOverlay = document.getElementById('closeOverlay');

// 3️⃣ Intercept clicks
protectedLinks.forEach(link => {
  link.addEventListener('click', e => {
    if (!isLoggedIn()) {
      e.preventDefault(); // stop navigation
      loginOverlay.classList.remove('hidden'); // show overlay
    }
  });
});

// 4️⃣ Close overlay button
closeOverlay.addEventListener('click', () => {
  loginOverlay.classList.add('hidden');
});
