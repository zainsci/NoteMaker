// Hidning All Forms
document.getElementById("cross").onclick = () => {
  document.getElementById("auth-form").style.display = "none";
  document.getElementById("signInForm").style.display = "none";
  document.getElementById("signUpForm").style.display = "none";
};

// Displaying Note Creating Form
document.getElementById("createNote").onclick = () => {
  const noteDisplay = document.getElementById("noteDisplay");
  noteDisplay.innerHTML = "";
  // Creating Form For Writing Note
  noteDisplay.appendChild(makeH1());
  noteDisplay.appendChild(makeInput());
  noteDisplay.appendChild(makeSelect());
  noteDisplay.appendChild(makeEditorWindow());
  noteDisplay.appendChild(makeButton());

  // Creating EventListener to Button For Submission
  document.getElementById("createNoteSave").onclick = () => {
    const request = new XMLHttpRequest();
    let title = document.getElementById("createNoteTitle").value;
    let tag = document.getElementById("createNoteTag").value;
    let content = document.getElementById("createNoteText").innerHTML;

    if (title == "" || content == "") {
      alert("Please Enter Both Title And Note Content");
    }

    request.open("POST", "/make_note");

    request.onload = () => {
      const data = JSON.parse(request.responseText);

      if (data.success) {
        showNoteInDisplay(data);

        // Displaying in Notes List
        const noteList = document.getElementById("notesList");
        const div = newNoteInNoteList(data);
        noteList.prepend(div);
      }
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tag", tag);

    request.send(formData);
    return false;
  };
};

// Display All Notes In Note List
document.getElementById("allNotesBtn").onclick = (e) => {
  e.preventDefault();
  document.getElementById("allNotesBtn").style.backgroundColor = "#ECECEC";
  document.querySelectorAll(".noteTags").forEach((t) => {
    t.style.backgroundColor = "white";
  });
  document.getElementById("notesList").innerHTML = "";
  fetch("/all_notes")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((note) => {
        const div = newNoteInNoteList(note);
        document.getElementById("notesList").appendChild(div);
      });
    });
};

// Showing Notes Related To One Tag
document.querySelectorAll(".noteTags").forEach((tag) => {
  tag.onclick = (e) => {
    e.preventDefault();
    animateProgressBar();
    document.getElementById("allNotesBtn").style.backgroundColor = "white";
    document.querySelectorAll(".noteTags").forEach((t) => {
      t.style.backgroundColor = "white";
    });
    tag.style.backgroundColor = "#ECECEC";
    document.getElementById("notesList").innerHTML = "";
    fetch(`/notes/${tag.id}`)
      .then((res) => res.json())
      .then((notes) => {
        notes.forEach((note) => {
          const div = newNoteInNoteList(note);
          document.getElementById("notesList").appendChild(div);
        });
      });
    setTimeout(resetProgressBar, 1000);
  };
});

// Showing And Hiding SignIn SignUp Form
function showForm(name) {
  if (name === "signInForm") {
    document.getElementById("auth-form").style.display = "flex";
    document.getElementById("signInForm").style.display = "block";
    document.getElementById("signUpForm").style.display = "none";
  } else if (name === "signUpForm") {
    document.getElementById("auth-form").style.display = "flex";
    document.getElementById("signInForm").style.display = "none";
    document.getElementById("signUpForm").style.display = "block";
  }
}

// For Displaying Note
function showNote(id) {
  fetch(`/note/${id}`)
    .then((response) => response.json())
    .then((data) => {
      showNoteInDisplay(data);
    });
}

// New Note Appending Function
function newNoteInNoteList(data) {
  const div = document.createElement("div");
  div.classList = "toast show mb-4";
  let newNote = `
            <div class="toast-header">
              <strong class="mr-auto">${
                data.title.slice(0, 20) + "..."
              }</strong>
              <small class="text-muted"
                >${data.timestamp}</small
              >
            </div>
            <div class="toast-body">
            ${data.content.slice(0, 60) + "..."}
            </div>
            <a href="javascript:showNote(${
              data.id
            })" class="stretched-link"></a>
        `;
  div.innerHTML = newNote;
  return div;
}

// Make H1 For Note Creation Form
function makeH1() {
  const h1 = document.createElement("h1");
  h1.textContent = "Create A Note";

  return h1;
}

// Make Select For Note Creation Form
function makeSelect() {
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

// Make Input For Note Creation Form
function makeInput() {
  const input = document.createElement("input");
  input.type = "text";
  input.id = "createNoteTitle";
  input.classList = "form-control mb-1";
  input.placeholder = "Note title here...";
  input.maxLength = 60;
  input.setAttribute("autocomplete", "off");

  return input;
}

function makeEditorWindow() {
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

// Editor
function makeEditor() {
  const fieldset = document.createElement("fieldset");

  const btnItalic = makeBtn();
  btnItalic.innerHTML = `
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-italic" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.991 11.674L9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
    </svg>
    `;
  btnItalic.addEventListener("click", () => {
    document.execCommand("italic", false, null);
  });

  const btnBold = makeBtn();
  btnBold.innerHTML = `
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-bold" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
    </svg>
    `;
  btnBold.addEventListener("click", () => {
    document.execCommand("bold", false, null);
  });

  const btnUnderline = makeBtn();
  btnUnderline.innerHTML = `
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-underline" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136z"/>
    <path fill-rule="evenodd" d="M12.5 15h-9v-1h9v1z"/>
    </svg>
    `;
  btnUnderline.addEventListener("click", () => {
    document.execCommand("underline", false, null);
  });

  const btnStrikeThrough = makeBtn();
  btnStrikeThrough.innerHTML = `
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-type-strikethrough" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.527 13.164c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5h3.45c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967zM6.602 6.5H5.167a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607 0 .31.083.581.27.814z"/>
    <path fill-rule="evenodd" d="M15 8.5H1v-1h14v1z"/>
    </svg>
    `;
  btnStrikeThrough.addEventListener("click", () => {
    document.execCommand("strikethrough", false, null);
  });

  fieldset.appendChild(btnBold);
  fieldset.appendChild(btnItalic);
  fieldset.appendChild(btnUnderline);
  fieldset.appendChild(btnStrikeThrough);
  return fieldset;
}

function makeBtn() {
  const btn = document.createElement("button");
  btn.classList = "btn";
  btn.style.height = "36px";
  btn.style.border = 0;
  btn.style.display = "inline";

  return btn;
}

// Make Button For Note Creation Form
function makeButton() {
  const btn = document.createElement("button");
  btn.id = "createNoteSave";
  btn.classList = "btn btn-outline-primary mt-3";
  btn.textContent = "Save";

  return btn;
}

// Show Note in Display Window
function showNoteInDisplay(data) {
  const noteDisplay = document.getElementById("noteDisplay");
  noteDisplay.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.innerHTML = data.title;
  const small = document.createElement("small");
  small.innerHTML = data.timestamp + " - " + data.tag;
  small.style.color = "#aaa";
  const p = document.createElement("p");
  p.innerHTML = data.content;

  noteDisplay.appendChild(h1);
  noteDisplay.appendChild(small);
  noteDisplay.appendChild(p);
  return;
}

// Animate Progress Bar
function animateProgressBar() {
  const progressBar = document.getElementById("progressBar");
  let i = 0;
  while (i < 100) {
    progressBar.style.width = `${i}%`;
    progressBar.setAttribute("aria-valuenow", i);
    i++;
  }
}
function resetProgressBar() {
  progressBar.style.width = 0;
  progressBar.setAttribute("aria-valuenow", 0);
}
