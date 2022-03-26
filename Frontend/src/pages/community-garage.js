import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "..//pages/messenger/community.css";
import Notes from "../components/Notes";
import "../components/Modal/modal.css";
import LandingPage from "./LandingPage";

function CommunityGarage() {
  return (
    <>
      <Navbar />
      <div className="lower-navbar">
        <h5>Community Garage</h5>
        <h6>Get Connect with other Parents to learn from them</h6>
      </div>

      <div className="garage">
        <div className="posts">
          <div className="postsWrapper">
            <Notes />
          </div>
        </div>

        {/* <div className="videos">
          <div className="videoWrapper">
            <h4 styel={{zIndex:'100000'}}>
              <LandingPage />
            </h4>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default CommunityGarage;
