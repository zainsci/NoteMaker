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
    const title = document.getElementById("createNoteTitle");
    const content = document.getElementById("createNoteContent");

    const request = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("title", title.value);
    formData.append("content", content.value);

    request.open("POST", "/make_note");
    request.send(formData);

    request.onload = (data) => {
      console.log(data.target.response.status);
      console.log(data.target.responseText.data);
    };
  };
};

// For Disabling Buttons
function disableButton(btn) {
  btn.classList.add = "disabaled";
}
