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

  // Function to display notes
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
          <h3 class="text-xl font-semibold text-gray-800">${
            note.subjectName
          }</h3>
        </div>

        <p class="text-gray-600 mb-2 text-sm">${
          note.description || "No description available."
        }</p>
        <p class="text-sm text-gray-500 mb-1"><i class="ri-calendar-line mr-1"></i> Uploaded: ${
          note.uploadDate
        }</p>
        <p class="text-sm text-gray-500 mb-1"><i class="ri-book-line mr-1"></i> Branch: ${
          note.branch
        }</p>
        <p class="text-sm text-gray-500 mb-4"><i class="ri-user-line mr-1"></i> Uploaded by: ${
          note.uploadedBy
        }</p>

        <a href="${note.fileLink}" target="_blank"
           class="inline-flex items-center gap-2 bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition">
           <i class="ri-download-line"></i> View Notes
        </a>
      `;

      container.appendChild(card);
    });
  }

  // Toast message
  function showToast() {
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 2500);
  }

  // Enhanced search
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filteredNotes = allNotes.filter(
      (note) =>
        note.subjectName.toLowerCase().includes(query) ||
        note.branch.toLowerCase().includes(query) ||
        note.uploadedBy.toLowerCase().includes(query)
    );
    displayNotes(filteredNotes);
  });
});

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
