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
