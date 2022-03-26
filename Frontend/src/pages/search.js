import React, {
  useContext,
  Fragment,
  useEffect,
  useState,
  useRef,
} from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/UI/Card";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";
import { useFetchSpecialists } from "../hooks/useFetchSpecialists";
import { UsersContext } from "../context/users/UserContext";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../context/messenger/StateProvider";
import Footer1 from "../components/Footer/footer";
import "../CSS/style.css";
import "./search.css";

function Search() {
  const { user } = useContext(AuthContext);
  const [specialists, setSpecialists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [specificConversation, setSpecificConversation] = useState();
  const history = useHistory();
  const [testConv, setTestConv] = useState(null);
  const [showEmptyBox, setShowEmptyBox] = useState(false);
  const [{ senderId, receiverId, createConversation }, dispatch] =
    useStateValue();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/getUserBy?userId=" + user?.id)
      .then((res) => {
        user.picture = res.data[0].picture;
        console.log(user.picture);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/specialists"
      );
      //console.log("specialists>>> ", res.data);
      setSpecialists(res.data);
    } catch (error) {
      alert("Server Error");
    }
  }, []);
  useEffect(() => {
    let boxes = document.querySelectorAll(".specialist__container__items__div");
    console.log("boxes.length>>", boxes.length);
    if (boxes.length > 0) {
      setShowEmptyBox(false);
    }
    if (boxes.length == 0) {
      setShowEmptyBox(true);
    }
    console.log("boxes.length======", boxes.length);
  }, [searchTerm]);
  const messageTheDoc = (e, doctorId) => {
    e.preventDefault();

    const sender = user.id;
    const receiver = doctorId;

    //checking that conversation already exists or not

    dispatch({
      type: "SET_CREATE_CONV_INFO",

      senderId: sender,
      receiverId: receiver,
      createConversation: false,
    });

    ////////////////////

    // console.log("createConvInfo: ", senderId, receiverId);
    // console.log("Message doc: ", sender, receiver);

    /**********redirect to messenger */
    history.push("/messenger");
  };

  const { users } = useContext(UsersContext);

  return (
    <>
      <Navbar />
      <div className="lower-navbar">
        <h5>View Child Specialists</h5>
        <h6>Select Child Specialist to Book Appointment</h6>
      </div>
      <div className="specialist">
        <div className="specialist__container">
          <div className="specialist__container__search">
            <input
              type="text"
              name="search"
              className="Search"
              placeholder="Enter child specialist's name"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                console.log("searching....");
              }}
            />
            <IconContext.Provider value={{ size: 25, color: "#fff" }}>
              <button onClick={searchTerm}>
                <AiIcons.AiOutlineSearch />
              </button>
            </IconContext.Provider>
          </div>

          <div className="specialist__container__items">
            {specialists &&
              specialists.length > 0 &&
              specialists
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((item) => {
                  // console.log("item>> ", item);
                  if (item?.approvalStatus === "accepted") {
                    return (
                      <div
                        key={item.id}
                        className="specialist__container__items__div"
                      >
                        <div className="profile-image-container">
                          <img
                            src={
                              item?.picture
                                ? item?.picture
                                : "https://st4.depositphotos.com/1156795/20814/v/450/depositphotos_208142524-stock-illustration-profile-placeholder-image-gray-silhouette.jpg"
                            }
                            className="account-setting-profile-img"
                          />
                        </div>
                        <div className="specialist__container__items__div__items">
                          <label>Name </label>
                          <p>{item.name}</p>
                        </div>

                        <div className="specialist__container__items__div__items">
                          <label>Qualification </label>
                          <p>{item.qualification}</p>
                        </div>

                        <div className="specialist__container__items__div__items">
                          <label>Email </label>
                          <p>{item.email}</p>
                        </div>

                        <div className="specialist__container_profile">
                          <Link
                            to={`/profile/${item._id}`}
                            /* to={`/book-appointments/${item._id}`} */
                          >
                            <button className="specialist__container__items__div__items__button">
                              View Profile
                            </button>
                          </Link>

                          <Link onClick={(e) => messageTheDoc(e, item._id)}>
                            <button className="specialist__container__items__div__items__button">
                              Contact Doctor
                            </button>
                          </Link>
                        </div>
                      </div>
                    );
                  } else {
                    return <></>;
                  }
                })}
          </div>
          {showEmptyBox === true && searchTerm !== "" && (
            <div className="confirmed__empty">
              <h1>No Searched Item Found</h1>
            </div>
          )}
        </div>
      </div>
      <Footer1 />
    </>
  );
}

export default Search;
