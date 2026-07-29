import { useState } from "react";
import { Search, X } from "lucide-react";

import { searchUsers, createChat, createGroup } from "../../api/chatApi";

import "./NewChat.css";

function NewChat({ setSelectedSection, setSelectedChat }) {

  const [selectedTab, setSelectedTab] = useState("friend");

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [groupSearchText, setGroupSearchText] = useState("");
  const [groupSearchResults, setGroupSearchResults] = useState([]);

  const [groupMembers, setGroupMembers] = useState([]);

  const [groupName, setGroupName] = useState("");

  const handleSearch = async (e) => {


    if (e.key !== "Enter") return;

    try {

      const data = await searchUsers(searchText);

      setSearchResults(data.data.user);


    } catch (error) {

      console.error(error);

    }

  };

  const handleGroupSearch = async (e) => {

    if (e.key !== "Enter") return;

    try {

      const data = await searchUsers(groupSearchText);

      setGroupSearchResults(data.data.user);

    } catch (error) {

      console.error(error);

    }

  };



  const addMember = (user) => {

    const alreadyAdded = groupMembers.some(
      (member) => member.id === user.id
    );

    if (alreadyAdded) return;

    setGroupMembers((prev) => [...prev, user]);

  };



  const removeMember = (id) => {

    setGroupMembers((prev) =>
      prev.filter((member) => member.id !== id)
    );

  };



  const handleStartChat = async (user) => {

    try {

      const data = await createChat(user.id);

      setSelectedSection("chats");

      setSelectedChat(data.data.chat);

    } catch (error) {

      console.error(error);

    }

  };



  const handleCreateGroup = async () => {

    try {

        const memberIds = groupMembers.map((member) => member.id);

        const data = await createGroup(groupName, memberIds);

        setSelectedSection("groups");

        setSelectedChat(data.data.group);

    } catch (error) {

        console.error(error);

    }

};




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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearch}
            />

            <Search className="friend-chat-search-icon" />

          </div>


          <div className="friend-search-result-div">

            {searchResults.length === 0 ? (

              <div className="no-users-found">
                No users found
              </div>

            ) : (

              searchResults.map((user) => (

                <div
                  className="friend-search-result-details"
                  key={user.id}
                >

                  <img
                    src={`http://localhost:5000${user.profilePicture}`}
                    alt=""
                    className="friend-search-result-details-profile-pic"
                  />

                  <div className="friend-search-result-details-middle-section">

                    <div className="friend-search-result-details-username">
                      {user.fullName}
                    </div>

                    <div className="friend-search-result-details-email">
                      {user.email}
                    </div>

                  </div>

                  <button className="friend-search-result-details-start-chat-button" onClick={() => handleStartChat(user)} >
                    Start Chat
                  </button>

                </div>

              ))

            )}

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
              value={groupSearchText}
              onChange={(e) => setGroupSearchText(e.target.value)}
              onKeyDown={handleGroupSearch}
            />

            <Search className="group-chat-search-icon" />

          </div>


          <div className="group-search-result-div">

            {groupSearchResults.length === 0 ? (

              <div className="no-users-found">
                No users found
              </div>

            ) : (

              groupSearchResults.map((user) => (

                <div
                  className="group-search-result-details"
                  key={user.id}
                >

                  <img
                    src={`http://localhost:5000${user.profilePicture}`}
                    alt=""
                    className="group-search-result-details-profile-pic"
                  />

                  <div className="group-search-result-details-middle-section">

                    <div className="group-search-result-details-username">
                      {user.fullName}
                    </div>

                    <div className="group-search-result-details-email">
                      {user.email}
                    </div>

                  </div>

                  <button className="group-search-result-details-add-to-group-button" onClick={() => addMember(user)} >
                    Add
                  </button>

                </div>

              ))

            )}

          </div>


          <div className="group-added-friends-list">

            <div className="group-added-friends-list-title">NEW GROUP MEMBERS</div>

            {groupMembers.map((member) => (

              <div
                className="group-added-friend-details"
                key={member.id}
              >

                <img
                  src={`http://localhost:5000${member.profilePicture}`}
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

                <X className="remove-added-friend-from-group" onClick={() => removeMember(member.id)} />

              </div>

            ))}

          </div>


          <div className="group-creation-div">

            <input
              type="text"
              placeholder="Enter group name"
              className="group-name-input"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />

            <button className="group-create-button" onClick={handleCreateGroup}>
              Create Group
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default NewChat;
