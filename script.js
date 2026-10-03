const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];

function render() {
  list.innerHTML = "";

  if (notes.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "Nothing here yet. Add a note to get started.";
    list.appendChild(emptyMessage);
  }

  notes.slice().reverse().forEach((note) => {
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
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";

    metadata.appendChild(category);
    metadata.appendChild(date);
    card.appendChild(text);
    card.appendChild(metadata);
    card.appendChild(deleteButton);
    list.appendChild(card);
  });

  count.textContent =
    notes.length === 1 ? "You have 1 note." : `You have ${notes.length} notes.`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const note = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text: input.value.trim(),
    category: categoryInput.value,
    createdAt: new Date().toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  };

  notes.push(note);
  render();
  input.value = "";
  input.focus();
});

render();