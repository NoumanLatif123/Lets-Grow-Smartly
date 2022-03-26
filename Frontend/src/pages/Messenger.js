import React, { useContext, useRef } from "react";
import Navbar from "../components/Navbar/Navbar";
import Conversation from "../components/conversations/Conversation";
import Message from "../components/message/Message";
import ChatOnline from "../components/chatOnline/ChatOnline";
import ReceiverInfo from "../components/receiverInfo/ReceiverInfo";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import "./messenger.css";
import { io } from "socket.io-client";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFile from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useStateValue } from "../context/messenger/StateProvider";
import MoodIcon from "@mui/icons-material/Mood";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [arrivalConversation, setArrivalConversation] = useState(null);
  const [refreshMsgs, setRefreshMsgs] = useState();
  const [specificReceiver, setSpecificReciever] = useState(null);
  const [{ senderId, receiverId, createConversation }, dispatch] =
    useStateValue();
  const [msgImgUrl, setMsgImgUrl] = useState("");
  const [showSendImg, setShowSendImg] = useState(false);
  const [isMsgSent, setIsMsgSent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/getUserBy?userId=" + user?.id)
      .then((res) => {
        user.picture = res.data[0].picture;
        // console.log(user.picture);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        conversationId: currentChat?._id ? currentChat?._id : "12345",
        imgUrl: data.imgUrl,
        isReceived: data.isReceived,
      });
      //setRefreshMsgs(Math.floor(Math.random() * 56));
    });
    socket.current.on("getConversation", (data) => {
      //console.log("data from get conversation>>> ", data);
      let temp_conversation = {
        _id: data.conversationId,
        members: [data.senderId, data.receiverId],
      };
      if (temp_conversation !== null) {
        setConversations((prev) => [...prev, temp_conversation]);
      }
      // console.log("beore", conversations);
      // conversations.sort(function (a, b) {
      //   // Turn your strings into dates, and then subtract them
      //   // to get a value that is either negative, positive, or zero.
      //   return new Date(b.date) - new Date(a.date);
      // });
      // console.log("after", conversations);
      //setArrivalConversation(temp_conversation);
      //console.log("temp_conver>>> ", temp_conversation);
      console.log("arrival conversation>> ", arrivalConversation);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  //console.log("createConversation>> ", createConversation);
  // useEffect(() => {
  //   if (senderId && receiverId) {
  //     setCurrentChat({
  //       conversationId: "",
  //       members: [senderId, receiverId],
  //     });
  //   }
  // }, []);
  useEffect(() => {
    //console.log("createConvInfo sender+receiver>> ", senderId, receiverId);

    if (senderId && receiverId) {
      axios
        .get(
          `http://localhost:5000/api/conversations/find/${senderId}/${receiverId}`
        )
        .then((res) => {
          if (res.data == null) {
            //console.log("receiver does not exists");
            axios
              .post(
                `http://localhost:5000/api/conversations/create/${senderId}/${receiverId}`
              )
              .then((res) => {
                // console.log("post method conversation response> ", res);
                setConversations([...conversations, res.data]);
                setCurrentChat(res.data);

                //for real time effect on receiver end
                socket.current.emit("sendConversation", {
                  conversationId: res.data._id,
                  senderId: senderId,
                  receiverId: receiverId,
                  isReceived: true,
                });
              });
          } else {
            //console.log("receiver existssssss");
            //setConversations([...messages, res.data]);
            setCurrentChat(res.data);
          }
          console.log(res.data);
        });
    }
  }, []);

  useEffect(() => {
    console.log("running spcket useEsse");
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      // console.log("socket users>>> ", users);
    });
  }, [user]);

  useEffect(() => {
    //console.log("after rfrsh");
    const getConversations = async () => {
      //console.log("userId in get conv >>> ", user.id);

      try {
        const res = await axios.get(
          "http://localhost:5000/api/conversations/" + user.id
        );
        //console.log("conversations>>>", res);
        setConversations(res.data);

        //deleting conversations

        //console.log("conversations to delete", conversations);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      getConversations();
      //console.log(conversations);
    }, 500);

    //another way
    // axios
    //   .get("http://localhost:5000/api/conversations/" + user.id)
    //   .then((res) => {
    //     setConversations(res.data);
    //     //console.log("conversations>>> ", conversations);
    //   });
  }, [user.id, refreshMsgs]);
  useEffect(() => {
    // setTimeout(() => {
    //    conversations.map((conv) => {
    //     axios
    //       .get("http://localhost:5000/api/messages/" + conv?._id)
    //       .then((res) => {
    //         if (res.data.length === 0) {
    //           // console.log("conv to delete>> ", conv);
    //           axios.delete(
    //             `http://localhost:5000/api/conversations/delete/${conv?._id}`
    //           );
    //         }
    //       });
    //   });
    // }, 5000);
    //alert("i temporarily commented delete converstion code");
  }, [conversations]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      getMessages();
    }, 500);
  }, [currentChat, refreshMsgs, conversations]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages, refreshMsgs]);

  useEffect(() => {
    const specificReceiverId = currentChat?.members.find(
      (member) => member !== user.id
    );
    axios
      .get(
        "http://localhost:5000/api/users/getUserBy?userId=" + specificReceiverId
      )
      .then((res) => setSpecificReciever(res.data[0]))
      .catch((error) => console.error(error));
  }, [currentChat]);
  //console.log("specificReceiver", specificReceiver);
  //console.log("1 messages>> ", messages);
  //console.log("USER >>> ", user);
  const setMessageNotificatons = (conversation) => {
    // console.log("setting messages notification");
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/messages/" + conversation?._id
        );
        // setMessages(res.data);
        // console.log("set messages >>> ", messages);
        let messages = res.data;
        messages.map((message) => {
          const data = {
            messageId: message._id,
            isReceived: true,
          };
          axios.put(`http://localhost:5000/api/messages/update`, data);
          // console.log("message>>>>", message);
        });
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      getMessages();
    }, 500);
    setRefreshMsgs(Math.floor(Math.random() * 56));
    //console.log("refreshing...");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowEmoji(false);
    //console.log("current chat >>> ", currentChat);
    setIsMsgSent(true);
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat._id,
      imgUrl: "",
      isReceived: false,
    };
    //console.log("message trsting >>> ", message);
    const receiverId = currentChat.members.find((member) => member !== user.id);
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
      imgUrl: "",
      isReceived: true,
    });
    try {
      const res = axios.post("http://localhost:5000/api/messages/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
      setRefreshMsgs(Math.floor(Math.random() * 56));
      //updating conversation updateAt

      const data = {
        conversationId: currentChat._id,
      };
      axios.put(`http://localhost:5000/api/conversations/update`, data);
      /****************** */
      //send notifications

      axios
        .post(`http://localhost:5000/api/notifications/`, {
          receiverId: receiverId,
          text: `${user.name} sent you a message!.`,
          read: false,
        })
        .then((res) => {
          //console.log("send message notification>> ", res);
        })
        .catch((err) => {
          console.log(err);
        });

      //console.log("messages>>> ", messages);
    } catch (err) {
      console.log(err);
    }
  };
  //console.log("width: ",window.innerWidth)
  //console.log("curent chat of ", user.name, ">> ", currentChat);
  const uploadImage = (e) => {
    e.preventDefault();
    setShowSendImg(false);
    setShowEmoji(false);
    setIsMsgSent(true);
    //console.log("uploading image");
    const file = document.getElementById("inputGroupFile01").files;
    // console.log("file >>> ", file);
    if (!file[0]) {
      return;
    }
    const formData = new FormData();

    formData.append("img", file[0]);

    fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((r) => {
        console.log();
      })
      .catch((e) => {
        console.log(e);
      });

    //console.log("filename>> ", file[0]);

    const message = {
      sender: user.id,
      text: "",
      conversationId: currentChat._id,
      imgUrl: `http://localhost:5000/api/upload/${file[0]?.name}`,
      isReceived: false,
    };
    const receiverId = currentChat.members.find((member) => member !== user.id);
    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: "",
      imgUrl: `http://localhost:5000/api/upload/${file[0]?.name}`,
      isReceived: true,
    });
    setMsgImgUrl(`http://localhost:5000/api/upload/${file[0]?.name}`);
    try {
      const res = axios.post("http://localhost:5000/api/messages/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
      setRefreshMsgs(Math.floor(Math.random() * 56));

      //console.log("messages>>> ", messages);

      //updating conversation updateAt

      const data = {
        conversationId: currentChat._id,
      };
      axios.put(`http://localhost:5000/api/conversations/update`, data);
      /****************** */
    } catch (err) {
      console.log(err);
    }

    document.getElementById("inputGroupFile01").value = "";
  };
  const searchChat = async (e) => {
    //e.preventDefault();
    //const searchedConv = document.getElementById("searchChat").value;
    console.log("item searched>> ", searchTerm);
    if (searchTerm === "") {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/conversations/" + user.id
        );
        // console.log("empty search res>>>", res);

        setConversations(res.data);
        console.log("conersation", conversations);
      } catch (err) {
        console.log(err);
      }

      return;
    } else {
      //console.log(conversations);
      const filteredConversations = [];
      conversations.map((conversation) => {
        const ReceiverId = conversation?.members.find(
          (member) => member !== user.id
        );
        console.log("reciever id>>> ", ReceiverId);
        axios
          .get("http://localhost:5000/api/users/getUserBy?userId=" + ReceiverId)
          .then((res) => {
            // console.log("res>>>>> ", res);
            if (res.data[0]?.name.toLowerCase() == searchTerm.toLowerCase()) {
              filteredConversations.push(conversation);
            }
          });

        //console.log("searched conversation>>> ", searchedConv);
        return;
      });
      setTimeout(() => {
        setConversations(filteredConversations);
        console.log("filtered conversation>>> ", filteredConversations);
      }, 100);
    }
  };
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    //console.log(emojiObject);
    setNewMessage(newMessage + emojiObject.emoji);
    //alert(emojiObject);
  };
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div className="chatMenuHeader">
              <Avatar src={user?.picture} />
              <h4>{user?.name}</h4>
            </div>
            <div className="chatMenuHeading">
              <h1>All Conversations</h1>
            </div>
            {/*<input placeholder="Search people..." className="chatMenuInput" />*/}
            <div className="chatMenuSearch">
              <div
                className="chatMenuSearchContainer"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <input
                  placeholder="Search chat by user..."
                  type="text"
                  className="searchChat"
                  id="searchChat"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    console.log(searchTerm);
                  }}
                />
                <IconButton>
                  <SearchIcon onClick={(e) => searchChat(e)} />
                </IconButton>
              </div>
            </div>
            <div className="chatMenuConversationBox">
              {conversations &&
                conversations
                  .sort(function (a, b) {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(a.updatedAt) - new Date(b.updatedAt);
                  })
                  .map((c) => (
                    <div
                      onClick={() => {
                        setCurrentChat(c);
                        setMessageNotificatons(c);
                      }}
                    >
                      <Conversation
                        conversation={c}
                        currentUser={user}
                        refreshMsgs={refreshMsgs}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  <h4
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      fontSize: "16px",
                      padding: "10px",
                      marginBottom: "15px",
                      color: "#888",
                    }}
                  >
                    Now you both can send messages to each other.
                  </h4>
                  {messages.map((m) => {
                    return (
                      <div ref={scrollRef}>
                        <Message message={m} own={m?.sender === user?.id} />
                      </div>
                    );
                  })}
                </div>
                {/* <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div> */}
                <div className="chat__footer">
                  {/*<InsertEmoticonIcon />*/}
                  <form>
                    <IconButton
                      className="emojiBtn"
                      style={{ width: "maxContent" }}
                    >
                      <MoodIcon onClick={() => setShowEmoji(true)} />
                    </IconButton>
                    <input
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message"
                      type="text"
                      value={newMessage}
                    />
                    <button onClick={(e) => handleSubmit(e)}>
                      <IconButton>
                        <SendIcon />
                      </IconButton>
                    </button>
                  </form>
                  {/*<MicIcon />*/}
                  {/* <IconButton variant="contained">
                    <AttachFile />
                  </IconButton> */}
                  <IconButton
                    variant="contained"
                    onClick={() => setShowSendImg(true)}
                  >
                    <PhotoCameraBackIcon />
                  </IconButton>
                </div>
                {showSendImg ? (
                  <div className="sendImageBox chat__footer">
                    <div className="form">
                      <input
                        type="file"
                        name="file"
                        className="form-control-file"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        /*onChange={onChangeFile}*/
                      />
                      {/* <label for="file" class="custom-file-label">
                        Choose File
                      </label> */}

                      <IconButton
                        onClick={(e) => uploadImage(e)}
                        class="form_submit_btn"
                      >
                        <IosShareIcon />
                      </IconButton>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {showEmoji && (
                  <div>
                    <Picker
                      onEmojiClick={onEmojiClick}
                      skinTone={"SKIN_TONE_NEUTRAL"}
                      pickerStyle={{
                        width: "100%",
                        backgroundColor: "rgb(151, 206, 206)",
                      }}
                      disableSearchBar
                    />
                  </div>
                )}
              </>
            ) : (
              <span className="nochat-text">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        {specificReceiver ? (
          <>
            <div className="receiverInfo">
              <div className="receiverInfoWrapper">
                <ReceiverInfo receiver={specificReceiver} />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Messenger;
