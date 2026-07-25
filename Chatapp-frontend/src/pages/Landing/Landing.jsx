import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import ConversationDisplay from "../../components/ConversationDisplay/ConversationDisplay";
import "./Landing.css";

export function Landing() {
  return (
    <>
      <Header />
      <div className="landing-container">
        <Menu />
        <ConversationDisplay />
      </div>

    </>

  )
}