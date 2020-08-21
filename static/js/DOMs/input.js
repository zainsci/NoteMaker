// Make Input For Note Creation Form
export default function makeInput() {
  const input = document.createElement("input");
  input.type = "text";
  input.id = "createNoteTitle";
  input.classList = "form-control mb-1";
  input.placeholder = "Note title here...";
  input.maxLength = 60;
  input.setAttribute("autocomplete", "off");

  return input;
}
