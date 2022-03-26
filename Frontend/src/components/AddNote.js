import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import LandingPage from "../pages/LandingPage";

const AddNote = ({ showAddPost, setShowAddPost }) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  console.log(showAddPost, setShowAddPost);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        //ref={ref}

        style={{
          width: "maxContent",
          border: "0",
          cursor: "pointer",
          padding: "5px 10px",
          border: "none",
          borderBottom: "1px solid gray",
          cursor: "pointer",
          background: "none",
          padding: "10px",
          fontSize: "1.1rem",
          marginBottom: "2vh",
        }}
        onClick={() => {
          setShowAddPost(!showAddPost);
        }}
      >
        {showAddPost ? "See Posts" : "Add Post"}
      </button>
      <div className="container">
        <form>
          <div className="row">
            <div className="col-25">
              <label>Title</label>
            </div>
            <div className="col-75">
              <input
                type="text1"
                id="title"
                name="title"
                placeholder="Write your title here..(min 3 chrachters)"
                value={note.title}
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
                id="tag"
                name="tag"
                placeholder="Write your tag here.."
                value={note.tag}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label>Discription</label>
            </div>
            <div className="col-75">
              <textarea
                id="description"
                name="description"
                placeholder="Write Something..(min 5 chrachters)"
                style={{ height: "200px" }}
                value={note.description}
                onChange={onChange}
                minLength={5}
                required
              ></textarea>
            </div>
          </div>
          <div className="row">
            <input
              disabled={note.title.length < 5 || note.description.length < 5}
              type="submit"
              value="Submit"
              onClick={handleClick}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNote;
