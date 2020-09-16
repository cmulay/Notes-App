"use strict";

// Read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save the notes to localStorage
const saveNotes = (notes) => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove a note from the list
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement("a");
  const titleEl = document.createElement("p");
  const contentsEl = document.createElement("p");
  const dateEl = document.createElement("span");

  // Setup the note title text
  if (note.title.length > 0) {
    titleEl.textContent = note.title;
  } else {
    titleEl.textContent = "Untitled Note";
  }
  titleEl.classList.add("title");
  noteEl.appendChild(titleEl);

  // Setup the note contents text
  if (note.body.length > 0) {
    contentsEl.textContent = note.body;
  } else {
    contentsEl.textContent = "Looks Empty";
  }
  contentsEl.classList.add("contents");
  noteEl.appendChild(contentsEl);

  // Setup the link
  noteEl.setAttribute("href", `/notes/edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  //Setup the date status
  dateEl.textContent = generateLastEdited(note.updatedAt);
  dateEl.classList.add("date");
  noteEl.appendChild(dateEl);

  return noteEl;
};

// Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

// Render application notes
const renderNotes = (notes, filters) => {
  const notesEl = document.querySelector("#notes");

  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  notesEl.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Create your first Note!";
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};

// Generate the last edited message
const generateLastEdited = (timestamp) => {
  return `${moment(timestamp).fromNow()}`;
};
