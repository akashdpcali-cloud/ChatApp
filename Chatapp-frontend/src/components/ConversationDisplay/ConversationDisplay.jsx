import "./ConversationDisplay.css";

import { useEffect, useState } from "react";
import { getAllChats, getOneToOneChats, getGroups } from "../../api/chatApi";

function ConversationDisplay({
  selectedChat,
  setSelectedChat,
  selectedSection,
}) {
  const [chats, setChats] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchChats = async () => {
      try {
        let data;

        if (selectedSection === "home") {
          data = await getAllChats();
        } else if (selectedSection === "chats") {
          data = await getOneToOneChats();
        } else if (selectedSection === "groups") {
          data = await getGroups();
        } else {
          return;
        }

        if (selectedSection === "groups") {
          setChats(data.data.groups);
        } else {
          setChats(data.data.chats);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, [selectedSection]);

  return (
    <div
      className={`conversation-display-section ${
        selectedChat ? "hide-conversations" : ""
      }`}
    >
      <div className="section-name">Chats</div>

      <input type="text" className="search-bar" placeholder="Search..." />

      <div className="conversations">
        {chats.map((chat) => {
          const otherUser = !chat.isGroup
            ? chat.participants.find(
                (participant) => participant.user.id !== currentUser.id,
              )?.user
            : null;

          return (
            <div
              className="chat-details"
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat);

                setChats((prev) =>
                  prev.map((c) =>
                    c.id === chat.id ? { ...c, unreadCount: 0 } : c,
                  ),
                );
              }}
            >
              <div className="chat-left-section">
                <img
                  src={
                    chat.isGroup
                      ? `http://localhost:5000${chat.groupImage || "/images/chatapp-default-group.jpeg"}`
                      : `http://localhost:5000${otherUser?.profilePicture || "/images/chatapp-default-avatar.jpeg"}`
                  }
                  alt=""
                  className="profile-pic"
                />
              </div>

              <div className="chat-middle-section">
                <div className="contact-name">
                  {chat.isGroup ? chat.groupName : otherUser?.fullName}
                </div>

                <div className="induvisual-or-group">
                  {chat.isGroup ? "Group" : "Individual"}
                </div>

                <div className="latest-message">
                  {chat.messages.length > 0
                    ? chat.messages[chat.messages.length - 1].content
                    : "No messages yet"}
                </div>
              </div>

              <div className="chat-right-section">
                <div className="latest-message-time">
                  {new Date(chat.updatedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                {chat.unreadCount > 0 && (
                  <div className="unread-number">{chat.unreadCount}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConversationDisplay;
