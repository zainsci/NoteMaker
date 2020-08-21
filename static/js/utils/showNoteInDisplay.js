import makeMenuBtnList from "./makeMenuButtonList.js";

// Show Note in Display Window
export default function showNoteInDisplay(data) {
  const noteDisplay = document.getElementById("noteDisplay");
  noteDisplay.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.innerHTML = data.title;
  const small = document.createElement("small");
  small.innerHTML = data.timestamp + " - " + data.tag;
  small.style.color = "#aaa";
  const menuBtns = document.createElement("div");
  menuBtns.className = "menu-buttons";
  menuBtns.appendChild(makeMenuBtnList(data));
  const p = document.createElement("p");
  p.innerHTML = data.content;

  noteDisplay.appendChild(menuBtns);
  noteDisplay.appendChild(h1);
  noteDisplay.appendChild(small);
  noteDisplay.appendChild(p);

  return;
}
