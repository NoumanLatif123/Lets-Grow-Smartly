import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Comment from "../components/Comment.js";
import { AuthContext } from "../context/AuthContext.js";

function DetailVideoPage(props) {
  const videoId = props.match.params.videoId;
  const [Video, setVideo] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState("true");
  const [showInputBox, setShowInputBox] = useState("true");
  const [comments, setComments] = useState();
  const { user } = useContext(AuthContext);

  const videoVariable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/video/getVideo", videoVariable)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.video);
          setVideo(response.data.video);
        } else {
          alert("Failed to get video Info");
        }
      });
  }, [videoVariable]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/comments/${Video?._id}`)
      .then((res) => {
        setComments(res.data);
        console.log("comments", res.data);
      })
      .catch((error) => console.error(error));
  }, [Video]);
  const PostTheComment = () => {
    const body = {
      NoteId: Video?._id,
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
    <>
      <div style={{ width: "75%", padding: "3rem 4em" }}>
        <video
          style={{ width: "100%" }}
          src={`http://localhost:5000/${Video?.filePath}`}
          controls
        ></video>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            marginTop: "12px",
            fontWeight: "550",
          }}
        >
          {Video?.title ? Video?.title : "loading..."}
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            fontWeight: "550",
          }}
        >
          <img
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              marginRight: "10px",
              borderRadius: "100%",
            }}
            src={
              Video?.writer?.picture
                ? Video?.writer?.picture
                : "https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=612x612&w=0&h=ODVFrdVqpWMNA1_uAHX_WJu2Xj3HLikEnbof6M_lccA="
            }
            alt=""
          />
          <span
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              marginTop: "5px",
            }}
          >
            {Video?.writer ? Video?.writer.name : "loading..."}
          </span>
          <br />
        </div>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "60px",
            marginTop: "3px",
          }}
        >
          {Video?.description ? Video?.description : "loading..."}
        </span>
      </div>
      <div style={{ width: "50vw", marginLeft: "5vw" }}>
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
        <div className="comments__box">
          {comments?.length > 0 ? (
            <>
              <h1 style={{ fontSize: "1.3rem", marginBottom: "2vh" }}>
                Comments
              </h1>
              {comments?.map((comment) => (
                <Comment
                  name={comment?.senderName}
                  commentTxt={comment?.text}
                />
              ))}
            </>
          ) : (
            <h1>No Comments.</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailVideoPage;
