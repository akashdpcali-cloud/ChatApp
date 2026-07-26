import "./Header.css";

export default function Header({ selectedChat, setSelectedSection }) {
  return (
    <header className="header">
      <div className="left-section app-title">Chat App</div>
      <div className="right-section">
        <button className="newchat-button" onClick={() => setSelectedSection("newChat")} >New Chat</button>
        <div className="profile-section-header">
          <img src="/chatapp-default-avatar.jpeg" alt="Not-avliable" className="profile-pic" />
          <div className="username">Username</div>
        </div>
      </div>

      {!selectedChat && (
        <button className="newchat-button mobile-button" onClick={() => setSelectedSection("newChat")}>
          +
        </button>
      )}

    </header>
  )
}
