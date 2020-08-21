import makeH1 from "../DOMs/h1.js";
import makeInput from "../DOMs/input.js";
import makeSelect from "../DOMs/select.js";
import makeEditorWindow from "../utils/editorWindow.js";
import { makeSaveButton } from "../DOMs/button.js";

export default function displayNoteCreator() {
  const noteDisplay = document.getElementById("noteDisplay");
  noteDisplay.innerHTML = "";
  // Creating Form For Writing Note
  noteDisplay.appendChild(makeH1());
  noteDisplay.appendChild(makeInput());
  noteDisplay.appendChild(makeSelect());
  noteDisplay.appendChild(makeEditorWindow());
  noteDisplay.appendChild(makeSaveButton());
}
