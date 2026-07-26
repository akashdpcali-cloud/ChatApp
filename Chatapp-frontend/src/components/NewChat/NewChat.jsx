import { useState } from "react";
import { Search, X } from "lucide-react";

import "./NewChat.css";

function NewChat() {

  const [selectedTab, setSelectedTab] = useState("friend");

  const [friendSearchResults] = useState([
    {
      id: 1,
      username: "Cielo D P",
      email: "cielo@email.com",
      profilePicture: "/chatapp-default-avatar.jpeg"
    }
  ]);

  const [groupSearchResults] = useState([
    {
      id: 1,
      username: "John",
      email: "john@email.com",
      profilePicture: "/chatapp-default-avatar.jpeg"
    }
  ]);

  const [groupMembers] = useState([
    {
      id: 1,
      username: "Akash",
      email: "akash@email.com",
      profilePicture: "/chatapp-default-avatar.jpeg"
    }
  ]);

  return (

    <div className="new-chat-box">

      <div className="new-chat-box-header">

        <div
          className={`friend-chat-option ${selectedTab === "friend" ? "active-option" : ""}`}
          onClick={() => setSelectedTab("friend")}
        >
          Friend
        </div>

        <div
          className={`group-chat-option ${selectedTab === "group" ? "active-option" : ""}`}
          onClick={() => setSelectedTab("group")}
        >
          Group
        </div>

      </div>


      {selectedTab === "friend" && (

        <div className="friend-chat-option-div">

          <div className="friend-chat-search-dev">

            <input
              type="text"
              placeholder="Search Email"
              className="friend-chat-search"
            />

            <Search className="friend-chat-search-icon" />

          </div>


          <div className="friend-search-result-div">

            {friendSearchResults.map((user) => (

              <div
                className="friend-search-result-details"
                key={user.id}
              >

                <img
                  src={user.profilePicture}
                  alt=""
                  className="friend-search-result-details-profile-pic"
                />

                <div className="friend-search-result-details-middle-section">

                  <div className="friend-search-result-details-username">
                    {user.username}
                  </div>

                  <div className="friend-search-result-details-email">
                    {user.email}
                  </div>

                </div>

                <button className="friend-search-result-details-start-chat-button">
                  Start Chat
                </button>

              </div>

            ))}

          </div>

        </div>

      )}



      {selectedTab === "group" && (

        <div className="group-chat-option-div">

          <div className="group-chat-search-dev">

            <input
              type="text"
              placeholder="Search Email"
              className="group-chat-search"
            />

            <Search className="group-chat-search-icon" />

          </div>


          <div className="group-search-result-div">

            {groupSearchResults.map((user) => (

              <div
                className="group-search-result-details"
                key={user.id}
              >

                <img
                  src={user.profilePicture}
                  alt=""
                  className="group-search-result-details-profile-pic"
                />

                <div className="group-search-result-details-middle-section">

                  <div className="group-search-result-details-username">
                    {user.username}
                  </div>

                  <div className="group-search-result-details-email">
                    {user.email}
                  </div>

                </div>

                <button className="group-search-result-details-add-to-group-button">
                  Add
                </button>

              </div>

            ))}

          </div>


          <div className="group-added-friends-list">

            {groupMembers.map((member) => (

              <div
                className="group-added-friend-details"
                key={member.id}
              >

                <img
                  src={member.profilePicture}
                  alt=""
                  className="group-added-friend-profile-picture"
                />

                <div className="group-added-friend-details-middle-section">

                  <div className="group-added-friend-details-username">
                    {member.username}
                  </div>

                  <div className="group-added-friend-details-email">
                    {member.email}
                  </div>

                </div>

                <X className="remove-added-friend-from-group" />

              </div>

            ))}

          </div>


          <div className="group-creation-div">

            <input
              type="text"
              placeholder="Enter Group Name"
              className="group-name-input"
            />

            <button className="group-create-button">
              Create Group
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default NewChat;
