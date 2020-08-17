from flask import Flask, render_template, url_for, request, redirect, jsonify, session, flash
from flask import json
from models import Session, db, User, Note
import os
import hashlib
from datetime import datetime

app = Flask(__name__)
app.secret_key = b'\xd9|\x1b8\x13r\x95\x97\xee\x17"`\x8cdHh'

# Setting up session
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"


# Home Or Default Route
@app.route("/")
def index():
    if session.get("username"):
        notes = db.query(Note).filter_by(user_id=session["user_id"]).all()

        notes = reversed(list(notes))
        return render_template("dashboard.html", notes=notes)
    return render_template("index.html")


# User Sign In Route
@app.route("/signin", methods=["GET", "POST"])
def signin():
    # First clear session
    session.clear()

    # If User tries to signin
    if request.method == "POST":
        username = request.form['signinUsername']
        password = request.form['signinPassword']

        # If Username is not provided
        if not username:
            flash("Must Type A Username")
            return render_template("index.html")
        # If Password is not provided
        elif not password:
            flash("Must Type A Password")
            return render_template("index.html")

        # Querying Database for User with Username
        user = db.query(User).filter_by(username=username).first()
        db.commit()

        # If Databse returned User object
        if user:
            # Hashing Password for password checking
            hash = hashlib.md5(password.encode('utf-8')).hexdigest()

            # matching password from databse and the user entered
            if hash == user.hash:
                session['username'] = user.username
                session['user_id'] = user.id
                return redirect(url_for('index'))
            # if incorrect password
            else:
                flash("Invalid Username or Password")
                return redirect(url_for("index"))
        # if incorrect username
        else:
            flash("Invalid Username or Password")
            return redirect(url_for("index"))
    else:
        return redirect(url_for("index"))


@app.route("/signup", methods=["GET", "POST"])
def signup():
    # clearing session
    session.clear()

    # if user tries to signup
    if request.method == "POST":
        # getting username and other
        username = request.form['signupUsername']
        email = request.form['signupEmail']
        password = request.form['signupPassword']
        conf_password = request.form['conf-password']

        # if username is not provided
        if not username:
            flash("Must Provide A Username")
            return redirect(url_for("index"))
        # or email is not provided
        elif not email:
            flash("Must Provide An Email")
            return redirect(url_for("index"))
        # if both password are provided
        elif not password or not conf_password:
            flash("Must Provide A Password And Confirmation Password")
            return redirect(url_for("index"))
        else:
            # if both passwords are not same
            if password != conf_password:
                flash("Password Does Not Match")
                return redirect(url_for("index"))
            else:
                # entering user to database
                user = User()
                user.username = username
                user.email = email
                user.hash = hashlib.md5((password).encode('utf-8')).hexdigest()
                db.add(user)
                db.commit()
                # creating user session and logging in
                session['username'] = user.username
                session['user_id'] = user.id
                flash(f"Account Created With Username {username}")
                return redirect(url_for("index"))
    else:
        return redirect("index")


@app.route("/make_note", methods=["POST"])
def make_note():
    newNote = Note()
    newNote.title = request.form["title"]
    newNote.content = request.form["content"]
    newNote.tag = request.form["tag"]
    newNote.timestamp = datetime.now()
    newNote.user_id = session["user_id"]
    db.add(newNote)
    db.commit()

    data = {
        "success": True,
        "title": newNote.title,
        "content": newNote.content,
        "tag": newNote.tag,
        "timestamp": newNote.timestamp.strftime("%d %b %Y %I:%M:%S %p"),
        "id": newNote.id
    }
    return jsonify(data)


@app.route("/all_notes")
def all_notes():
    db_data = db.query(Note).filter_by(user_id=session["user_id"]).all()
    notes = []
    for data in db_data:
        note = {
            "success": True,
            "title": data.title,
            "content": data.content,
            "timestamp": data.timestamp.strftime("%d %b %Y %I:%M:%S %p"),
            "id": data.id
        }
        notes.append(note)
    data = notes[::-1]

    return jsonify(data)


# API for Single Note For Display Route
@app.route("/note/<int:note_id>", methods=["GET", "POST"])
def note(note_id):
    # Querying Database for User And Note with ID
    note = db.query(Note).filter_by(id=note_id).first()
    # Checking If Note Belogns To The Person Logged IN
    if note:
        if note.user_id == session["user_id"]:
            note = {
                "title": note.title,
                "content": note.content,
                "timestamp": note.timestamp.strftime("%d %b %Y %I:%M:%S %p"),
                "tag": note.tag
            }
            return jsonify(note)
        else:
            return jsonify({"error": 404})
    else:
        return jsonify({"error": 404})


# For Notes Related To One Tag
@app.route("/notes/<string:tag>")
def notes_tag(tag):
    dbData = db.query(Note).filter_by(tag=tag[3:]).all()
    notes = []
    for data in dbData:
        note = {
            "success": True,
            "title": data.title,
            "content": data.content,
            "timestamp": data.timestamp.strftime("%d %b %Y %I:%M:%S %p"),
            "id": data.id
        }
        notes.append(note)
    data = notes[::-1]

    return jsonify(data)


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)