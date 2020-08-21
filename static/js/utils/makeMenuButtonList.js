import { makeMenuButton } from "../DOMs/button.js";
import editNote from "./editNote.js";
import bookmarkNote from "./bookmarkNote.js";
import deleteNote from "./deleteNote.js";
// Importing SVG Icons
import svgEdit from "../SVGs/edit.js";
import svgDelete from "../SVGs/delete.js";
import svgBookmark from "../SVGs/bookmark.js";
import svgBookmarkFill from "../SVGs/bookmarkFill.js";

export default function makeMenuBtnList(data) {
  const div = document.createElement("div");
  const edit = makeMenuButton();
  edit.innerHTML = svgEdit;
  edit.addEventListener("click", () => {
    editNote(data);
  });
  const bookmark = makeMenuButton();
  bookmark.id = "noteBookmark";
  if (data.bookmark) {
    bookmark.innerHTML = svgBookmarkFill;
  } else {
    bookmark.innerHTML = svgBookmark;
  }
  bookmark.addEventListener("click", () => {
    bookmarkNote(data.id);
  });
  const del = makeMenuButton();
  del.innerHTML = svgDelete;
  del.addEventListener("click", () => {
    deleteNote(data.id);
  });

  div.appendChild(edit);
  div.appendChild(bookmark);
  div.appendChild(del);
  return div;
}
