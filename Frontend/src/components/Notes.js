import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import "./notes.css";
import UserRating from "../components/Modal/user-rating";
import { useHistory } from "react-router";
import LandingPage from "../pages/LandingPage";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [show, setshow] = useState(false);
  const ref = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  let history = useHistory();
  const [showAddPost, setShowAddPost] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    console.log("current Note", currentNote);
    setshow(true);
    //ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    console.log("note at ", note);
  };

  const handleClick = () => {
    console.log("Updating your Post", note);

    editNote(note.id, note.etitle, note.edescription, note.etag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {showAddPost ? (
        <AddNote showAddPost={showAddPost} setShowAddPost={setShowAddPost} />
      ) : (
        <>
          <br />
          <br />

          {/* <button
          ref={ref}
          className="modal-button "
          style={{ display: "none" }}
          onClick={() => setshow(true)}
        >
          Show Modal
        </button> */}

          <UserRating
            title="Edit Your Post"
            onClose={() => setshow(false)}
            show={show}
          >
            <form autoComplete="off">
              {console.log("note", note)}
              <div className="row">
                <div className="col-25">
                  <label>Title</label>
                </div>
                <div className="col-75">
                  <input
                    type="text1"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label>Tag</label>
                </div>
                <div className="col-75">
                  <input
                    type="text1"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-25">
                  <label>Discription</label>
                </div>
                <div className="col-75">
                  <textarea
                    id="edescription"
                    name="edescription"
                    style={{ height: "120px" }}
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="modal-button1"
                  disabled={
                    note.etitle.length < 5 || note.edescription.length < 5
                  }
                  onClick={handleClick}
                  //type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </UserRating>

          <div className="garage2">
            <div className="posts__container">
              <h1 className="header">
                Posts{" "}
                <button
                  //ref={ref}
                  className="modal-button "
                  style={{
                    marginLeft: "auto",
                    width: "maxContent",
                    border: "0",
                    cursor: "pointer",
                    padding: "5px 10px",
                  }}
                  onClick={() => setShowAddPost(!showAddPost)}
                >
                  {"Add Post"}
                </button>
              </h1>
              <div class="container2">
                {notes.length === 0 && "No recent posts to display"}
              </div>
              {notes.map((note) => {
                return (
                  <Noteitem
                    key={note._id}
                    updateNote={updateNote}
                    note={note}
                  />
                );
              })}
            </div>
            <div className="videos">
              <div className="videoWrapper">
                <h4 styel={{ zIndex: "100000" }}>
                  <LandingPage />
                </h4>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Notes;
