// Select elements
const uploadBox = document.getElementById("uploadBox");
const fileInput = document.getElementById("fileUpload");
const fileNameDisplay = document.getElementById("fileName");
const uploadText = document.getElementById("uploadText");
const form = document.getElementById("uploadForm");
const toast = document.getElementById("toast");

// Click to open file dialog
uploadBox.addEventListener("click", () => fileInput.click());

// When user selects a file
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    const fileExt = file.name.split(".").pop().toLowerCase();
    if (fileExt !== "pdf" && fileExt !== "doc") {
      alert("Only PDF and DOC files are allowed!");
      fileInput.value = "";
      fileNameDisplay.classList.add("hidden");
      uploadText.textContent = "Click to upload or drag and drop";
      return;
    }
    fileNameDisplay.textContent = `📄 ${file.name}`;
    fileNameDisplay.classList.remove("hidden");
    uploadText.textContent = "File selected successfully!";
    uploadText.classList.add("text-indigo-600", "font-medium");
  } else {
    fileNameDisplay.classList.add("hidden");
    uploadText.textContent = "Click to upload or drag and drop";
    uploadText.classList.remove("text-indigo-600", "font-medium");
  }
});

// Drag & drop functionality
uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadBox.classList.add("border-indigo-600", "bg-indigo-50");
});

uploadBox.addEventListener("dragleave", () => {
  uploadBox.classList.remove("border-indigo-600", "bg-indigo-50");
});

uploadBox.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadBox.classList.remove("border-indigo-600", "bg-indigo-50");

  const file = e.dataTransfer.files[0];
  if (file) {
    const fileExt = file.name.split(".").pop().toLowerCase();
    if (fileExt !== "pdf" && fileExt !== "doc") {
      alert("Only PDF and DOC files are allowed!");
      return;
    }
    fileInput.files = e.dataTransfer.files;
    fileNameDisplay.textContent = `📄 ${file.name}`;
    fileNameDisplay.classList.remove("hidden");
    uploadText.textContent = "File selected successfully!";
    uploadText.classList.add("text-indigo-600", "font-medium");
  }
});

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  if (!file) {
    alert("Please upload a valid file before submitting!");
    return;
  }

  // Collect form data
  const formData = {
    resourceType: document.getElementById("resourceType").value,
    subject: document.getElementById("subject").value,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    file: file.name,
  };

  console.log("Upload Request:", formData);

  // Show toast message
  toast.classList.remove("hidden");
  toast.classList.add("opacity-100", "translate-y-0");

  // Hide toast after 4 seconds
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 4000);

  // Reset form after submission
  form.reset();

  // Reset upload box text
  uploadText.textContent = "Click to upload or drag and drop";
  uploadText.classList.remove("text-indigo-600", "font-medium");
  fileNameDisplay.classList.add("hidden");
});
