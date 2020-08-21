import makeEditor from "./editor.js";

export default function makeEditorWindow() {
  const editorContainer = document.createElement("div");
  editorContainer.className = "editor-container";

  const textEditor = document.createElement("div");
  textEditor.className = "text-editor";

  const textSpace = document.createElement("div");
  textSpace.className = "text-space";
  textSpace.id = "createNoteText";
  textSpace.contentEditable = true;

  editorContainer.appendChild(textEditor);
  textEditor.appendChild(makeEditor());
  editorContainer.appendChild(textSpace);

  return editorContainer;
}
