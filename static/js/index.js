// Importing Functions
import showForm from "./utils/showForm.js";
import showNote from "./utils/showNote.js";
import displayNoteCreator from "./utils/displayNoteCreator.js";
import newNoteInNoteList from "./utils/newNoteInDisplay.js";
import makeOrUpdateNote from "./utils/makeUpdateNote.js";
import { animateProgressBar, resetProgressBar } from "./utils/progressbar.js";

// SignIn Form
document.querySelectorAll(".signInLink").forEach((item) => {
  item.onclick = (e) => {
    e.preventDefault();
    showForm("signInForm");
  };
});

// Signup Form
document.querySelectorAll(".signUpLink").forEach((item) => {
  item.onclick = (e) => {
    e.preventDefault();
    showForm("signUpForm");
  };
});

// Hidning All Forms
document.getElementById("cross").onclick = () => {
  document.getElementById("auth-form").style.display = "none";
  document.getElementById("signInForm").style.display = "none";
  document.getElementById("signUpForm").style.display = "none";
};

// Displaying Note Creating Form
document.getElementById("createNote").onclick = () => {
  displayNoteCreator();

  // Creating EventListener to Button For Submission
  document.getElementById("createNoteSave").onclick = () => {
    makeOrUpdateNote("make_note");
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
          div.addEventListener("click", (e) => {
            e.preventDefault();
            showNote(note.id);
          });
        });
      });
    setTimeout(resetProgressBar, 1000);
  };
});

// Displaying Note
document.querySelectorAll(".note").forEach((note) => {
  note.addEventListener("click", (e) => {
    e.preventDefault();
    showNote(note.id.slice(6));
  });
});
