import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import noteContext from "../context/notes/noteContext";
import "./notes.css";
import axios from "axios";
import { Avatar, IconButton } from "@mui/material";
import Comment from "./Comment";

const Noteitem = (props) => {
  const { user } = useContext(AuthContext);
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const [noteWriter, setNoteWriter] = useState({});
  const [newComment, setNewComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState("false");
  const [showInputBox, setShowInputBox] = useState("false");
  const [comments, setComments] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/getUserBy?userId=${note.user}`)
      .then((res) => {
        setNoteWriter(res.data[0]);
      })
      .catch((error) => console.error(error));

    axios
      .get(`http://localhost:5000/api/comments/${note._id}`)
      .then((res) => {
        setComments(res.data);
        console.log("comments", res.data);
      })
      .catch((error) => console.error(error));
  }, []);
  const commentsDiv = document.querySelectorAll(".comment");
  function removeActiveClasses() {
    commentsDiv.forEach((comment) => {
      comment.classList.remove("active");
    });
  }

  function settingActiveClass() {
    commentsDiv.forEach((comment) => {
      comment.addEventListener("click", (e) => {
        removeActiveClasses();
        comment.classList.add("active");
      });
    });
  }
  const PostTheComment = () => {
    const body = {
      NoteId: note._id,
      senderId: user.id,
      senderName: user.name,
      text: newComment,
    };
    axios
      .post("http://localhost:5000/api/comments/", body)
      .then((res) => setComments([...comments, res.data]))
      .catch((err) => console.log(err));
    setShowInputBox(false);
    setNewComment("");
  };

  return (
    <div class="card">
      <div className="writer__info">
        <Avatar src={noteWriter?.picture} />

        <h3>
          {noteWriter?.name} {note.user == user.id && "(You)"}
        </h3>
      </div>

      <div className="note__body">
        <h6>
          <b>{note.title}</b>
        </h6>
        <p>{note.description}</p>
      </div>
      <div className="action__buttons">
        {note.user == user.id ? (
          <>
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(note._id);
              }}
            >
              &nbsp;Delete
            </i>

            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updateNote(note);
              }}
            >
              {" "}
              &nbsp;Edit
            </i>
          </>
        ) : (
          <>
            <p onClick={() => setShowInputBox(true)}> Add Comment</p>
          </>
        )}
        <p onClick={() => setShowCommentBox(!showCommentBox)}>
          {showCommentBox == true ? "Hide Comments" : "Show Comments"}
        </p>
      </div>
      {showCommentBox == true && (
        <div className="comments__box">
          {comments?.length > 0 ? (
            <>
              <h1>Comments</h1>
              {comments?.map((comment) => (
                <Comment
                  name={comment.senderName}
                  commentTxt={comment.text}
                  clicked={settingActiveClass}
                />
              ))}
            </>
          ) : (
            <h1>No Comments.</h1>
          )}
        </div>
      )}
      {showInputBox == true && (
        <div className="input__inbox">
          <label for="comment-input">Enter comment: </label>
          <input
            onChange={(e) => setNewComment(e.target.value)}
            type="text"
            name="comment-input"
            value={newComment}
          ></input>
          <button onClick={() => PostTheComment()}>post</button>
        </div>
      )}
    </div>
  );
};

export default Noteitem;
