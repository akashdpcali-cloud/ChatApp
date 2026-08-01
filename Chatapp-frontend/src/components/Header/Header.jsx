import "./Header.css";
import useAuthStore from "../../store/authStore";

export default function Header({ selectedChat, setSelectedSection }) {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="header">
      <div className="left-section app-title">Chat App</div>
      <div className="right-section">
        <button
          className="newchat-button"
          onClick={() => {
            localStorage.setItem("selectedSection", "newChat");
            setSelectedSection("newChat");
          }}
        >
          New Chat
        </button>
        <div className="profile-section-header">
          {user?.profilePicture && (
            <img
              src={`http://localhost:5000${user.profilePicture}`}
              alt="profile"
              className="profile-pic"
            />
          )}

          <div className="username">{user?.fullName || "User"}</div>
        </div>
      </div>

      {!selectedChat && (
        <button
          className="newchat-button mobile-button"
          onClick={() => {
            localStorage.setItem("selectedSection", "newChat");
            setSelectedSection("newChat");
          }}
        >
          +
        </button>
      )}
    </header>
  );
}
