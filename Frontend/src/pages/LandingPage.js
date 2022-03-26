import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
import axios from "axios";
import moment from "moment";
import UploadIcon from "@mui/icons-material/Upload";
import IconButton from "@mui/material/IconButton";

function LandingPage() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data.videos);
        setVideos(response.data.videos);
      } else {
        alert("Failed to get Videos");
      }
    });
  }, []);

  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24}>
        <div
          style={{
            position: "relative",
            width: "80%",
            zIndex: "-1000000000000",
          }}
        >
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              alt="thumbnail"
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div
              className=" duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />

        <div
          style={{ display: "flex", alignItems: "center", fontWeight: "550" }}
        >
          <img
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              marginRight: "10px",
              borderRadius: "100%",
            }}
            src="https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=612x612&w=0&h=ODVFrdVqpWMNA1_uAHX_WJu2Xj3HLikEnbof6M_lccA="
            alt=""
          />
          <span>{video?.title ? video?.title : "loading..."}</span>
          <br />
        </div>

        <span style={{ paddingLeft: "55px" }}>
          {video?.writer ? video?.writer.name : "loading..."}{" "}
        </span>
        <br />
        <span style={{ paddingLeft: "55px", marginBottom: "90px" }}>
          {" "}
          {moment(video.createdAt).format("Do MMM YY")}{" "}
        </span>
      </Col>
    );
  });

  return (
    <div style={{ width: "75%", margin: "1rem auto", zIndex: "-100" }}>
      <Link to="/video/upload" style={{ display: "block" }}>
        <UploadIcon
          sx={{
            fontSize: 45,
            marginLeft: "0px",
            display: "block",
            color: "black",
            marginLeft: "auto",
          }}
        />
      </Link>
      <div>
        <h style={{ fontSize: "22px", fontWeight: "bold" }}>
          {" "}
          Recommended Videos
        </h>
      </div>
      <hr />
      <br />

      <Row
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gridRowGap: "2vh",
        }}
      >
        {renderCards}
      </Row>
    </div>
  );
}

export default LandingPage;
