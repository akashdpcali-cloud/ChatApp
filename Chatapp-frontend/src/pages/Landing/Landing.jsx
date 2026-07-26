import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import ConversationDisplay from "../../components/ConversationDisplay/ConversationDisplay";
import MessageDisplay from "../../components/MessageDisplay/MessageDisplay";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import { useState } from "react";
import "./Landing.css";

export function Landing() {

  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedSection, setSelectedSection] = useState("chat");

  return (
    <>
      <Header selectedChat={selectedChat} />
      <div className="landing-container">

        <Menu
          selectedChat={selectedChat}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />

        <div className="landing-content">

  {selectedSection === "chat" && (
    <>
      <ConversationDisplay
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />

      <MessageDisplay
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
    </>
  )}

  {selectedSection === "profile" && (
    <ProfileSection />
  )}

</div>

      </div>

    </>

  )
}