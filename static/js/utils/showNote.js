import showNoteInDisplay from "./showNoteInDisplay.js";
// For Displaying Note
export default function showNote(id) {
  fetch(`/note/${id}`)
    .then((response) => response.json())
    .then((data) => {
      showNoteInDisplay(data);
    });
}
