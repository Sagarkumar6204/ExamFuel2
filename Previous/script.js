// Fetch data from JSON file and display dynamically
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("papers-container");

  try {
    const response = await fetch("data.json");
    const data = await response.json();

    data.forEach(item => {
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
        <p class="text-sm text-gray-500 mb-4"><i class="ri-user-line mr-1"></i> Uploaded by: ${item.uploadedBy}</p>

        <a href="${item.fileLink}" target="_blank"
           class="inline-flex items-center gap-2 bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition">
           <i class="ri-download-line"></i> View Paper
        </a>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    container.innerHTML =
      "<p class='text-red-500 text-center col-span-full'>Failed to load data. Please check your JSON file.</p>";
  }
});




// Search functionality
document.getElementById("searchInput").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const cards = document.querySelectorAll("#papers-container > div");

  cards.forEach(card => {
    const subject = card.querySelector("h3").textContent.toLowerCase();
    if (subject.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
