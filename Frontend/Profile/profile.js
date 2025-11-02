// Edit Profile Modal
const editProfileBtn = document.getElementById("editProfileBtn");
const editModal = document.getElementById("editModal");
const nameInput = document.getElementById("nameInput");
const saveEdit = document.getElementById("saveEdit");
const cancelEdit = document.getElementById("cancelEdit");
const fullName = document.getElementById("fullName");

editProfileBtn.addEventListener("click", () => {
  nameInput.value = fullName.textContent;
  editModal.classList.remove("hidden");
});

cancelEdit.addEventListener("click", () => editModal.classList.add("hidden"));

saveEdit.addEventListener("click", () => {
  if (nameInput.value.trim() !== "") {
    fullName.textContent = nameInput.value.trim();
  }
  editModal.classList.add("hidden");
});

// Profile photo upload
const photoUpload = document.getElementById("photoUpload");
const profileInitials = document.getElementById("profileInitials");

photoUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      profileInitials.innerHTML = `<img src="${event.target.result}" class="w-28 h-28 rounded-full object-cover"/>`;
    };
    reader.readAsDataURL(file);
  }
});

// Terms Modal
const termsModal = document.getElementById("termsModal");
document
  .getElementById("termsBtn")
  .addEventListener("click", () => termsModal.classList.remove("hidden"));
document
  .getElementById("closeTerms")
  .addEventListener("click", () => termsModal.classList.add("hidden"));

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("userData");
    window.location.href = "/index.html";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  if (!user) return;

  // Update all fields dynamically
  const fullName = document.getElementById("fullName");
  const profileInitials = document.getElementById("profileInitials");
  const userEmail = document.getElementById("userEmail");
  const userPhone = document.getElementById("userPhone");

  if (fullName) fullName.textContent = user.name;
  if (profileInitials) {
    const initials = user.name
      .split(" ")
      .map((n) => n[0])
      .join("");
    profileInitials.textContent = initials;
  }
  if (userEmail) userEmail.textContent = user.email;
  if (userPhone) userPhone.textContent = user.phone;
});
const profileContainer = document.getElementById("profileContainer");
const user = JSON.parse(localStorage.getItem("userData"));

if (!user) {
  profileContainer.innerHTML = `<a href="/Login/login.html" class="bg-indigo-600 text-white px-4 py-2 rounded-full">Get Started</a>`;
} else {
  profileContainer.innerHTML = `
    <a href="/Profile/profile.html" class="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-full text-white flex items-center justify-center hover:scale-105 transition transform duration-200 shadow-md" title="Profile">
      <i class="ri-user-line text-xl"></i>
    </a>`;
}
