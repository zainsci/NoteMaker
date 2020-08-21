import newNoteInNoteList from "./newNoteInDisplay.js";
import showNoteInDisplay from "./showNoteInDisplay.js";

export default function makeOrUpdateNote(value, id) {
  const request = new XMLHttpRequest();
  let title = document.getElementById("createNoteTitle");
  let tag = document.getElementById("createNoteTag");
  let content = document.getElementById("createNoteText");

  if (title == "" || content == "") {
    alert("Please Enter Both Title And Note Content");
  }

  request.open("POST", `/${value}`);

  request.onload = () => {
    const data = JSON.parse(request.responseText);

    if (data.success) {
      showNoteInDisplay(data);

      // Displaying in Notes List
      if (value != "update_note") {
        const noteList = document.getElementById("notesList");
        const div = newNoteInNoteList(data);
        noteList.prepend(div);
      }
    }
  };

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.innerHTML);
  formData.append("tag", tag.value);
  if (value == "update_note") {
    formData.append("id", id);
  }

  request.send(formData);
  return false;
}
