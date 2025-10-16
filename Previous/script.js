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

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("papers-container");
  const searchInput = document.getElementById("searchInput");

  let papersData = [];

  // Function to display papers dynamically
  const displayPapers = (data) => {
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML =
        "<p class='text-center text-gray-500 col-span-full'>No matching papers found.</p>";
      return;
    }

    data.forEach((item) => {
      const card = document.createElement("div");
      card.className =
        "bg-white shadow-md hover:shadow-xl rounded-2xl p-6 transition duration-300 border border-gray-100";

      card.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-indigo-100 p-3 rounded-lg">
            <i class="ri-file-text-line text-indigo-700 text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-800">${item.subjectName}</h3>
        </div>

        <p class="text-sm text-gray-500 mb-1"><i class="ri-calendar-line mr-1"></i> Uploaded: ${item.dateOfUpload}</p>
        <p class="text-sm text-gray-500 mb-1"><i class="ri-calendar-line mr-1"></i> Session: ${item.session}</p>
        <p class="text-sm text-gray-500 mb-1"><i class="ri-book-line mr-1"></i> Branch: ${item.branch}</p>
        <p class="text-sm text-gray-500 mb-1"><i class="ri-stack-line mr-1"></i> College / University: ${item.college}</p>
        <p class="text-sm text-gray-500 mb-4"><i class="ri-user-line mr-1"></i> Uploaded by: ${item.uploadedBy}</p>

        <a href="${item.fileLink}" target="_blank"
           class="inline-flex items-center gap-2 bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition">
           <i class="ri-download-line"></i> View Paper
        </a>
      `;

      container.appendChild(card);
    });
  };

  try {
    const response = await fetch("data.json");
    papersData = await response.json();
    displayPapers(papersData);

    // Enhanced Search Functionality
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = papersData.filter(
        (item) =>
          item.subjectName.toLowerCase().includes(query) ||
          item.college.toLowerCase().includes(query) ||
          item.session.toLowerCase().includes(query) ||
          item.branch.toLowerCase().includes(query) ||
          item.uploadedBy.toLowerCase().includes(query)
      );
      displayPapers(filtered);
    });
  } catch (error) {
    console.error("Error loading JSON:", error);
    container.innerHTML =
      "<p class='text-red-500 text-center col-span-full'>Failed to load data. Please check your JSON file.</p>";
  }
});
