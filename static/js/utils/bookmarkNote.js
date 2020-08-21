import svgBookmark from "../SVGs/bookmark.js";
import svgBookmarkFill from "../SVGs/bookmarkFill.js";
// For Bookmarking Note
export default function bookmarkNote(id) {
  fetch(`/note/bookmark/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("noteBookmark").innerHTML = svgBookmarkFill;
      } else {
        document.getElementById("noteBookmark").innerHTML = svgBookmark;
      }
    });
}
