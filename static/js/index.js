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
  const input = document.createElement("input");
  input.type = "text";
  input.id = "createNoteTitle";
  input.classList = "form-control mb-1";
  input.placeholder = "Note title here...";
  input.maxLength = 60;
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
  document.getElementById("noteDisplay").appendChild(textarea);
  document.getElementById("noteDisplay").appendChild(btn);

  // Creating EventListener to Button For Submission
  document.getElementById("createNoteSave").onclick = () => {
    const request = new XMLHttpRequest();
    let title = document.getElementById("createNoteTitle").value;
    let content = document.getElementById("createNoteContent").value;

    if (title == "" || content == "") {
      alert("Please Enter Both Title And Note Content");
    }

    request.open("POST", "/make_note");

    request.onload = () => {
      const data = JSON.parse(request.responseText);

      if (data.success) {
        const noteDisplay = document.getElementById("noteDisplay");
        noteDisplay.innerHTML = "";

        const h1 = document.createElement("h1");
        h1.innerHTML = data.title;
        const small = document.createElement("small");
        small.innerHTML = data.timestamp;
        small.style.color = "#aaa";
        const p = document.createElement("p");
        p.innerHTML = data.content;

        noteDisplay.appendChild(h1);
        noteDisplay.appendChild(small);
        noteDisplay.appendChild(p);

        // Displaying in Notes List
        const noteList = document.querySelector(".notes-list");
        const div = document.createElement("div");
        div.classList = "card border-secondary mb-3";
        div.style.maxWidth = "18rem";
        let newNote = `
            <div class="card-header">${data.title.slice(0, 30) + "..."}</div>
            <div class="card-body text-secondary">
              <p class="card-text">
                ${data.content.slice(0, 60) + "..."}
                <a
                  href="javascript:showNote(${data.id})"
                  class="stretched-link"
                ></a>
              </p>
            </div>
        `;
        div.innerHTML = newNote;
        noteList.prepend(div);
      }
    };

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    request.send(formData);
    return false;
  };
};

// For Displaying Note
function showNote(id) {
  fetch(`/note/${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("noteDisplay").innerHTML = "";
      const h1 = document.createElement("h1");
      h1.innerHTML = data.title;
      const small = document.createElement("small");
      small.innerHTML = data.timestamp;
      small.style.color = "#aaa";
      const p = document.createElement("p");
      p.innerHTML = data.content;

      document.getElementById("noteDisplay").appendChild(h1);
      document.getElementById("noteDisplay").appendChild(small);
      document.getElementById("noteDisplay").appendChild(p);
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
