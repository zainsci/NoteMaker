from flask import Flask, render_template, url_for, request, redirect, jsonify
from models import session, User, Note
import os
import hashlib

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/signin")
def signin():
    if request.method == "POST":
        return redirect("index")
    else:
        return render_template("index.html")


@app.route("/signup")
def signup():
    if request.method == "POST":
        return redirect("index")
    else:
        return render_template("index.html")


@app.route("/fetchnotes")
def fetch_notes():
    if request.method == "POST":
        notes = session.query(Note).all()
        return jsonify({"notes": notes})
    else:
        pass


if __name__ == "__main__":
    app.run(debug=True)
