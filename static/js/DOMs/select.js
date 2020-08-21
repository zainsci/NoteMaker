// Make Select For Note Creation Form
export default function makeSelect() {
  const select = document.createElement("select");
  select.classList = "form-select ml-1 mb-1";
  select.id = "createNoteTag";
  let opts = ["Home", "Work", "Travel"];
  opts.forEach((opt) => {
    const o = document.createElement("option");
    o.value = opt;
    o.innerHTML = opt;
    select.appendChild(o);
  });
  return select;
}
