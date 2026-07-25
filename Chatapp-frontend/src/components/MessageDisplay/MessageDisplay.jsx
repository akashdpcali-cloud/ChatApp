import "./MessageDisplay.css";
import { EllipsisVertical, SendHorizontal, ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function MessageDisplay({ selectedChat, setSelectedChat }) {
  const messages = [
    {
      id: 1,
      sender: "me",
      text: "Hello, how are you?",
      time: "14:45",
    },
    {
      id: 2,
      sender: "contact",
      text: "I'm fine. What about you?",
      time: "14:46",
    },
    {
      id: 1,
      sender: "me",
      text: "Hello, how are you?",
      time: "14:45",
    },
    {
      id: 2,
      sender: "contact",
      text: "I'm fine. What about you?",
      time: "14:46",
    },
    {
      id: 1,
      sender: "me",
      text: "Hello, how are you?",
      time: "14:45",
    },
    {
      id: 2,
      sender: "contact",
      text: "I'm fine. What about you?",
      time: "14:46",
    },
    {
      id: 2,
      sender: "contact",
      text: "I'm fine. What about you?",
      time: "14:46",
    },
    {
      id: 1,
      sender: "me",
      text: "Hello, how are you?",
      time: "14:45",
    },
    {
      id: 1,
      sender: "me",
      text: "Hello, how are you?",
      time: "14:45",
    },


  ];

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside
      );
  }, []);

  return (
    <div
      className={`message-display-section ${!selectedChat ? "hide-messages" : ""
        }`}
    >
      <div className="message-header">
        <div className="message-left-section">

          <ArrowLeft
            className="back-button"
            onClick={() => setSelectedChat(null)}
          />

          <img
            src="/chatapp-default-avatar.jpeg"
            alt=""
            className="profile-pic"
          />

          <div>
            <div className="messager-name">Cielo D P</div>
            <div className="active-or-offline-detail">
              Active now
            </div>
          </div>
        </div>

        <div className="message-right-section" ref={menuRef}>
          <EllipsisVertical
            className="three-dot"
            onClick={() => setShowMenu(!showMenu)}
          />

          {showMenu && (
            <div className="message-options">
              <div className="message-option">
                Clear Chat
              </div>

              <div className="message-option">
                Block
              </div>

              <div className="message-option delete-option">
                Delete Contact
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="message-section">
        <div className="day-messages">
          <div className="message-date">Today</div>

          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.sender === "me"
                  ? "my-message right-message"
                  : "contact-message left-message"
              }
            >
              <div className="message">{message.text}</div>

              <div className="message-time">
                {message.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="type-section">
        <input
          type="text"
          className="text-type"
          placeholder="Type a message..."
        />

        <button className="send-button">
          <SendHorizontal size={22} />
        </button>
      </div>
    </div>
  );
}

export default MessageDisplay;