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

document.getElementById("cross").onclick = () => {
  document.getElementById("auth-form").style.display = "none";
  document.getElementById("signInForm").style.display = "none";
  document.getElementById("signUpForm").style.display = "none";
};

document.getElementById("createNote").onclick = () => {
  document.getElementById("noteDisplay").innerHTML = "";
  const h1 = document.createElement("h1");
  h1.textContent = "Create A Note";
  const textarea = document.createElement("textarea");
  textarea.classList = "form-control p-3";
  textarea.placeholder = "Write your thoughts here...";
  const btn = document.createElement("button");
  btn.classList = "btn btn-outline-primary mt-3";
  btn.textContent = "Save";

  document.getElementById("noteDisplay").appendChild(h1);
  document.getElementById("noteDisplay").appendChild(textarea);
  document.getElementById("noteDisplay").appendChild(btn);
};

// For Disabling Buttons
function disableButton(btn) {
  btn.classList.add = "disabaled";
}
