import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import ConversationDisplay from "../../components/ConversationDisplay/ConversationDisplay";
import MessageDisplay from "../../components/MessageDisplay/MessageDisplay";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import NewChat from "../../components/NewChat/NewChat";
import { useState } from "react";
import "./Landing.css";

export function Landing() {

  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedSection, setSelectedSection] = useState("home");

  return (
    <>
      <Header selectedChat={selectedChat} setSelectedSection={setSelectedSection} />
      <div className="landing-container">

        <Menu
          selectedChat={selectedChat}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />

        <div className="landing-content">


          {(selectedSection === "home" || selectedSection === "chats" || selectedSection === "groups") && (
            <>
              <ConversationDisplay
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                selectedSection={selectedSection}
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

          {selectedSection === "newChat" && (
            <NewChat />
          )}

        </div>

      </div>

    </>

  )
}