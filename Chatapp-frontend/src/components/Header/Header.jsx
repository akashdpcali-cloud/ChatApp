import "./Header.css";

export default function Header(){
  return(
<header className="header">
  <div className="left-section app-title">Chat App</div>
  <div className="right-section">
    <button className="newchat-button">New Chat</button>
    <div className="profile-section">
      <img src="/chatapp-default-avatar.jpeg" alt="Not-avliable" className="profile-pic" />
      <div className="username">Username</div>
    </div>
  </div>

    <button className="newchat-button mobile-button">+</button>

</header>
  )
}
