import "./Menu.css";
import { House, MessageCircle, Users, User } from "lucide-react";

function Menu() {
  return (
    <div className="menu">
      <div className="menu-sections">
        <House className="home-icon" />
        <div className="menu-title">Home</div>
      </div>

      <div className="menu-sections">
        <MessageCircle className="home-icon" />
        <div className="menu-title">Chats</div>
      </div>

      <div className="menu-sections">
        <Users className="home-icon" />
        <div className="menu-title">Groups</div>
      </div>

      <div className="menu-sections">
        <User className="home-icon" />
        <div className="menu-title">Profile</div>
      </div>
    </div>
  );
}

export default Menu;