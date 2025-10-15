// Fetch and display notes dynamically with search
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("notes-container");
  const searchInput = document.getElementById("searchInput");
  const toast = document.getElementById("toast");

  let allNotes = [];

  // Fetch notes from JSON
  try {
    const response = await fetch("notes.json");
    allNotes = await response.json();
    displayNotes(allNotes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    container.innerHTML =
      "<p class='text-red-500 text-center col-span-full'>Failed to load notes. Please check your JSON file.</p>";
  }

  // Display notes dynamically
  function displayNotes(notes) {
    container.innerHTML = "";

    if (notes.length === 0) {
      showToast();
      return;
    }

    notes.forEach((note) => {
      const card = document.createElement("div");
      card.className =
        "bg-white shadow-md hover:shadow-xl rounded-2xl p-6 transition duration-300 border border-gray-100";

      card.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-indigo-100 p-3 rounded-lg">
            <i class="ri-book-open-line text-indigo-700 text-2xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-800">${note.subjectName}</h3>
        </div>

        <p class="text-gray-600 mb-2 text-sm">${note.description || "No description available."}</p>

        <p class="text-sm text-gray-500 mb-1"><i class="ri-calendar-line mr-1"></i> Uploaded: ${note.uploadDate}</p>
        <p class="text-sm text-gray-500 mb-4"><i class="ri-user-line mr-1"></i> Uploaded by: ${note.uploadedBy}</p>

        <a href="${note.fileLink}" target="_blank"
           class="inline-flex items-center gap-2 bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition">
           <i class="ri-download-line"></i> View Notes
        </a>
      `;
      container.appendChild(card);
    });
  }

  // Show toast message
  function showToast() {
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 2500);
  }

  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filteredNotes = allNotes.filter((note) =>
      note.subjectName.toLowerCase().includes(query)
    );
    displayNotes(filteredNotes);
  });
});
