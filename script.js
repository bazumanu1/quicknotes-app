const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const STORAGE_KEY = "quicknotes-app-notes";

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadNotes();

function render() {
  list.innerHTML = "";
  const query = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter((note) => note.text.toLowerCase().includes(query));

  if (visibleNotes.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = query
      ? "No notes match your search."
      : "Nothing here yet. Add a note to get started.";
    list.appendChild(emptyMessage);
  }

  visibleNotes.slice().reverse().forEach((note) => {
    const card = document.createElement("li");
    card.classList.add("note-card", `category-${note.category}`);

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const metadata = document.createElement("div");
    metadata.classList.add("note-meta");

    const category = document.createElement("span");
    category.classList.add("category-label");
    category.textContent = note.category[0].toUpperCase() + note.category.slice(1);

    const date = document.createElement("time");
    date.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.dataset.noteId = note.id;
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";

    metadata.appendChild(category);
    metadata.appendChild(date);
    card.appendChild(text);
    card.appendChild(metadata);
    card.appendChild(deleteButton);
    list.appendChild(card);
  });

  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${notes.length} notes.`;
  }
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    input.focus();
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    input.focus();
    return;
  }

  errorMessage.textContent = "";
  const note = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text,
    category: categoryInput.value,
    createdAt: new Date().toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  };

  notes.push(note);
  saveNotes();
  render();
  input.value = "";
  input.focus();
});

list.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-button");
  if (!deleteButton) return;

  deleteNote(deleteButton.dataset.noteId);
});

searchInput.addEventListener("input", render);

document.querySelector("#clear-all-btn").addEventListener("click", () => {
  if (!confirm("Delete all notes?")) return;
  notes = [];
  saveNotes();
  render();
});

render();