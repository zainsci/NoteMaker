import displayNoteCreator from "./displayNoteCreator.js";
import makeOrUpdateNote from "./makeUpdateNote.js";

export default function editNote(data) {
  displayNoteCreator();

  document.getElementById("createNoteTitle").value = data.title;
  document.getElementById("createNoteTag").value = data.tag;
  document.getElementById("createNoteText").innerHTML = data.content;

  const update = document.getElementById("createNoteSave");
  update.innerHTML = "Update";
  update.addEventListener("click", () => {
    makeOrUpdateNote("update_note", data.id);
  });
}
