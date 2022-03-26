import React, { useState, useContext } from "react";
import { Form } from "antd";
import Navbar from "../components/Navbar/Navbar";
import swal from "sweetalert";
import Dropzone from "react-dropzone";
import { AuthContext } from "..//context/AuthContext";
import axios from "axios";

function UploadVideoPage(props) {
  //const user = useSelector(state => state.user);
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleChangeDecsription = (event) => {
    console.log(event.currentTarget.value);

    setDescription(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      title === "" ||
      Description === "" ||
      FilePath === "" ||
      Duration === "" ||
      Thumbnail === ""
    ) {
      return swal("Error!", "Please first fill all the fields", "error");
    }

    const variables = {
      writer: user.id,
      title: title,
      description: Description,
      filePath: FilePath,
      duration: Duration,
      thumbnail: Thumbnail,
    };

    axios
      .post("http://localhost:5000/api/video/uploadVideo", variables)
      .then((response) => {
        if (response.data.success) {
          swal("Good job!", "video Uploaded Successfully", "success");
          props.history.push("/community-garage");
        } else {
          swal("Error!", "Failed to upload video", "error");
        }
      });
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    formData.append("file", files[0]);

    axios
      .post("http://localhost:5000/api/video/uploadfiles", formData, config)
      .then((response) => {
        if (response.data.success) {
          let variable = {
            filePath: response.data.filePath,
            fileName: response.data.fileName,
          };
          setFilePath(response.data.filePath);

          //gerenate thumbnail with this filepath !

          axios
            .post("http://localhost:5000/api/video/thumbnail", variable)
            .then((response) => {
              if (response.data.success) {
                setDuration(response.data.fileDuration);
                setThumbnail(response.data.thumbsFilePath);
              } else {
                swal("Error!", "Failed to make the thumbnails", "error");
              }
            });
        } else {
          swal("Error!", "failed to save the video in server", "error");
        }
      });
  };

  return (
    <>
      <Navbar />

      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h9 style={{ fontSize: "22px", fontWeight: "bold" }}>
            {" "}
            Upload Video
          </h9>
        </div>

        <Form onSubmit={onSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <i className="fa fa-plus mx-5"></i>
                </div>
              )}
            </Dropzone>

            {Thumbnail !== "" && (
              <div>
                <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
              </div>
            )}
          </div>

          <br />
          <br />
          <div className="row">
            <div className="col-25">
              <label>Title</label>
            </div>
            <div className="col-75">
              <input
                type="text1"
                id="title"
                placeholder="Write your title here.."
                onChange={handleChangeTitle}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label>Description</label>
            </div>
            <div className="col-75">
              <textarea
                id="description"
                placeholder="Write Something.."
                style={{ height: "120px" }}
                onChange={handleChangeDecsription}
              ></textarea>
            </div>
          </div>

          <div className="row">
            <input type="submit" value="Upload" onClick={onSubmit} />
          </div>
        </Form>
      </div>
    </>
  );
}

export default UploadVideoPage;
