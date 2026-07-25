import "./ConversationDisplay.css";

function ConversationDisplay({selectedChat, setSelectedChat}) {
  const conversations = [
    {
      id: 1,
      name: "Cielo D P",
      type: "Individual",
      message: "How are you?",
      time: "14:45",
      unread: 2,
      online: true,
    },
    {
      id: 1,
      name: "Silver",
      type: "Individual",
      message: "hey, boy?",
      time: "16:15",
      unread: 1,
      online: true,
    },
    {
      id: 1,
      name: "Unknoen",
      type: "Individual",
      message: "maluuuu!!!",
      time: "14:45",
      unread: 0,
      online: false,
    },
  ];

  return (
    <div
  className={`conversation-display-section ${
    selectedChat ? "hide-conversations" : ""
  }`}
>
      <div className="section-name">Chats</div>

      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
      />

      <div className="conversations">
        {conversations.map((chat) => (
          <div className="chat-details" key={chat.id} onClick={() => setSelectedChat(chat)} >
            <div className="chat-left-section">
              <img src="/chatapp-default-avatar.jpeg" alt="" className="profile-pic" />

              {chat.online && (
                <div className="online-indicater"></div>
              )}
            </div>

            <div className="chat-middle-section">
              <div className="contact-name">{chat.name}</div>
              <div className="induvisual-or-group">{chat.type}</div>
              <div className="latest-message">{chat.message}</div>
            </div>

            <div className="chat-right-section">
              <div className="latest-message-time">
                {chat.time}
              </div>

              <div className="unread-number">
                {chat.unread}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConversationDisplay;