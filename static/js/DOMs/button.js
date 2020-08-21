// Make Button For Note Creation Form
export function makeSaveButton() {
  const btn = document.createElement("button");
  btn.id = "createNoteSave";
  btn.classList = "btn btn-outline-primary mt-3";
  btn.textContent = "Save";

  return btn;
}

export function makeBtn() {
  const btn = document.createElement("button");
  btn.classList = "btn";
  btn.style.height = "36px";
  btn.style.border = 0;
  btn.style.display = "inline";

  return btn;
}

// Buttons For Note Editing Menu
export function makeMenuButton() {
  const btn = document.createElement("button");
  btn.classList = "btn text-primary";

  return btn;
}
