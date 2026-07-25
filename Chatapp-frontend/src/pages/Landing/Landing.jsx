import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import ConversationDisplay from "../../components/ConversationDisplay/ConversationDisplay";
import MessageDisplay from "../../components/MessageDisplay/MessageDisplay";
import { useState } from "react";
import "./Landing.css";

export function Landing() {

  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <>
      <Header selectedChat={selectedChat} />
      <div className="landing-container">
        <Menu selectedChat={selectedChat} />

        <ConversationDisplay
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />

        <MessageDisplay
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </div>

    </>

  )
}