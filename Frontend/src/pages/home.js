import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer1 from "../components/Footer/footer";
import TopRatedDoctorsSlider from "../components/Top rated doctors slider/TopRatedDoctorsSlider";
import "./home.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/getUserBy?userId=" + user?.id)
      .then((res) => {
        user.picture = res.data[0].picture;
        user.approvalStatus = res.data[0].approvalStatus;
        if (res.data[0].approvalStatus === "pending") {
          history.push("/pending-application");
        } else {
          history.push("/");
        }
        // console.log(user.picture);
      })
      .catch((error) => console.error(error));
    // console.log("user>>>>> ", user);
  }, []);

  return (
    <>
      <div style={{ marginBottom: "50px" }}>
        <Navbar />

        <h2 id="t1">LET'S GROW SMARTLY</h2>
        <hr></hr>
        <div>
          <img
            id="main_image"
            className="food"
            src="https://www.vermontvisitingnurses.org/wp-content/uploads/2017/11/VNA-Maternal-Child-Health-Program-Vermont.jpg"
            alt="food"
          />
          <div className="second_div">
            <h2>
              CHILD SPECIALISTS.
              <br />
              BOOK APPOINTMENTS.
            </h2>
            <hr></hr>
            <h6>
              Meet the top rated child specailists
              <br />
              and nutritionists all over the world
              <br />
              in this platform.
            </h6>
            <br></br>
            <a href={user.userRole === "2" ? "/doctor/appointment" : "/search"}>
              <button className="getstarted">Get Started</button>
            </a>
          </div>
          {user.userRole === "1" && <TopRatedDoctorsSlider />}

          {/* <h2 id="pink_text"> Child Specialists </h2>
          <div className="pink">
            <div className="White1">
              <img
                id="pic_Home"
                src="https://www.janets.org.uk/wp-content/uploads/2020/07/18-Child-Health-Care-in-Health-Social-Care-Settings.jpg"
              />
            </div>
            <div className="White2">
              <img
                id="pic_Home"
                src="https://th.bing.com/th/id/OIP.hi22hpYHrhFu0nKTqpTYEgHaE7?w=272&h=181&c=7&r=0&o=5&pid=1.7"
              />
            </div>

            <div className="White3">
              <img
                id="pic_Home"
                src="https://th.bing.com/th/id/R.2cc7545cc9b2825216969542226b6cf9?rik=7UKSE08psZ3DhA&pid=ImgRaw&r=0"
              />
            </div>
  </div>*/}
        </div>
        {/* 
     <div className="Carousel">
     <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
         <div class="carousel-inner">
             <div class="carousel-item active">
                 <img  id="img_C"src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" class="d-block w-100" alt="..."/>
             </div>

             <div class="carousel-item">
                 <img id="img_C" src="https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGJpcnlhbml8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" class="d-block w-100" alt="..."/>
             </div>

             <div class="carousel-item">
                 <img id="img_C" src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" class="d-block w-100" alt="..."/>
             </div>
         </div>

         <button class="carousel-control-prev" className='getstarted' type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
             <span class="visually-hidden">Previous</span>
         </button>

         <button class="carousel-control-next" type="button" className='getstarted' data-bs-target="#carouselExampleControls" data-bs-slide="next">
             <span class="carousel-control-next-icon" aria-hidden="true"></span>
             <span class="visually-hidden">Next</span>
         </button>
     </div>
 </div>
*/}
        <Footer1 />
      </div>
    </>
  );
}

export default Home;
