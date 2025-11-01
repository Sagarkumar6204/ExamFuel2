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

// Select elements
const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileUpload");
const fileNameDisplay = document.getElementById("fileName");
const uploadText = document.getElementById("uploadText");
const form = document.getElementById("uploadForm");
const toast = document.getElementById("toast");

// Click to open file dialog
uploadBox.addEventListener("click", () => fileInput.click());

// Show file name after upload
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    const allowedTypes = ["application/pdf", "application/msword"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF or DOC files are allowed.");
      fileInput.value = "";
      return;
    }
    fileNameDisplay.textContent = `📁 ${file.name}`;
    fileNameDisplay.classList.remove("hidden");
    uploadText.textContent = "File selected successfully!";
  }
});

// Form validation helper
function validateInput(input, fieldName) {
  const value = input.value.trim();
  if (value.length < 3) {
    alert(`${fieldName} must be at least 3 characters long.`);
    input.focus();
    return false;
  }
  return true;
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload

  // Get form values
  const resourceType = document.getElementById("resourceType");
  const subject = document.getElementById("subject");
  const yourname = document.getElementById("yourname");
  const branch = document.getElementById("branch");
  const session = document.getElementById("session");
  const file = fileInput.files[0];

  // Validate required fields
  if (!resourceType.value) {
    alert("Please select a resource type.");
    return;
  }

  if (!validateInput(subject, "Subject")) return;
  if (!validateInput(yourname, "Your name")) return;
  if (!validateInput(branch, "Branch")) return;
  if (!validateInput(session, "Session")) return;

  if (!file) {
    alert("Please upload a file.");
    return;
  }

  // If all validations pass, show toast
  toast.classList.remove("hidden");
  toast.classList.add("opacity-100", "translate-y-0");

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.add("hidden");
    form.reset();
    fileNameDisplay.classList.add("hidden");
    uploadText.textContent = "Click to upload or drag and drop";
  }, 3000);
});
