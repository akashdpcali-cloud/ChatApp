import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import ConversationDisplay from "../../components/ConversationDisplay/ConversationDisplay";
import MessageDisplay from "../../components/MessageDisplay/MessageDisplay";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import NewChat from "../../components/NewChat/NewChat";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import { useState } from "react";
import "./Landing.css";

export function Landing() {
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedSection, setSelectedSection] = useState(
    localStorage.getItem("selectedSection") || "home",
  );

  const [typingChats, setTypingChats] = useState({});

  return (
    <>
      <Header
        selectedChat={selectedChat}
        setSelectedSection={setSelectedSection}
      />
      <div className="landing-container">
        <Menu
          selectedChat={selectedChat}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />

        <div className="landing-content">
          {(selectedSection === "home" ||
            selectedSection === "chats" ||
            selectedSection === "groups") && (
            <>
              <ConversationDisplay
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                selectedSection={selectedSection}
              />

              <MessageDisplay
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                typingChats={typingChats}
                setTypingChats={setTypingChats}
                setErrorMessage={setErrorMessage}
              />
            </>
          )}

          {selectedSection === "profile" && (
            <ProfileSection setErrorMessage={setErrorMessage} />
          )}

          {selectedSection === "newChat" && (
            <NewChat
              setSelectedSection={setSelectedSection}
              setSelectedChat={setSelectedChat}
              setErrorMessage={setErrorMessage}
            />
          )}
        </div>
      </div>

      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
    </>
  );
}
