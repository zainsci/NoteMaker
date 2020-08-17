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

// Hidning All Forms
document.getElementById("cross").onclick = () => {
  document.getElementById("auth-form").style.display = "none";
  document.getElementById("signInForm").style.display = "none";
  document.getElementById("signUpForm").style.display = "none";
};

// Displaying Note Creating Form
document.getElementById("createNote").onclick = () => {
  document.getElementById("noteDisplay").innerHTML = "";
  // Creating H1 Element For Form
  const h1 = document.createElement("h1");
  h1.textContent = "Create A Note";
  // Creating Title Input Field
  const input = makeInput();
  // Creating Select Menu
  const select = makeSelect();
  // Creating Content Textarea
  const textarea = document.createElement("textarea");
  textarea.id = "createNoteContent";
  textarea.classList = "form-control p-3";
  textarea.placeholder = "Write your thoughts here...";
  // Creating Submission Button
  const btn = document.createElement("button");
  btn.id = "createNoteSave";
  btn.classList = "btn btn-outline-primary mt-3";
  btn.textContent = "Save";

  document.getElementById("noteDisplay").appendChild(h1);
  document.getElementById("noteDisplay").appendChild(input);
  document.getElementById("noteDisplay").appendChild(select);
  document.getElementById("noteDisplay").appendChild(textarea);
  document.getElementById("noteDisplay").appendChild(btn);

  // Creating EventListener to Button For Submission
  document.getElementById("createNoteSave").onclick = () => {
    const request = new XMLHttpRequest();
    let title = document.getElementById("createNoteTitle").value;
    let content = document.getElementById("createNoteContent").value;
    let tag = document.getElementById("createNoteTag").value;

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

// For Displaying Note
function showNote(id) {
  fetch(`/note/${id}`)
    .then((response) => response.json())
    .then((data) => {
      showNoteInDisplay(data);
    });
}

// For Disabling Buttons
function disableButton(btn) {
  const loading = document.createElement("span");
  loading.classList = "spinner-border spinner-border-sm";
  loading.role = "status";
  btn.innerHTML = "";
  btn.appendChild(btn);
}

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
              <a
                href="javascript:showNote(${data.id})"
                class="stretched-link"
              ></a>
            </div>
        `;
  div.innerHTML = newNote;
  return div;
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

  return input;
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
