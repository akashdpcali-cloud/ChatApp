import "./MessageDisplay.css";
import { EllipsisVertical, SendHorizontal, ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getChatMessages, sendMessage, blockChat } from "../../api/chatApi";
import { socket } from "../../socket/socket";
import boneSound from "../../assets/bone-crack.mp3";

function groupMessagesByDate(messages) {
  const grouped = {};

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  messages.forEach((message) => {
    const messageDate = new Date(message.createdAt);

    const day = new Date(messageDate);
    day.setHours(0, 0, 0, 0);

    let label;

    if (day.getTime() === today.getTime()) {
      label = "Today";
    } else if (day.getTime() === yesterday.getTime()) {
      label = "Yesterday";
    } else {
      label = messageDate.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

    if (!grouped[label]) {
      grouped[label] = [];
    }

    grouped[label].push(message);
  });

  return grouped;
}

function MessageDisplay({
  selectedChat,
  setSelectedChat,
  setTypingChats,
  typingChats,
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  const messagesEndRef = useRef(null);

  const [messageInput, setMessageInput] = useState("");

  const [messages, setMessages] = useState([]);

  const typingTimeout = useRef(null);

  const previousChat = useRef(null);

  const groupedMessages = groupMessagesByDate(messages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!selectedChat) return;

    if (previousChat.current) {
      socket.emit("leave-chat", previousChat.current);
    }

    const fetchMessages = async () => {
      try {
        const data = await getChatMessages(selectedChat.id);

        setMessages(data.data.messages);

        socket.emit("mark-read", {
          chatId: selectedChat.id,
          userId: user.id,
        });

        socket.emit("join-chat", selectedChat.id);

        previousChat.current = selectedChat.id;
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [selectedChat]);

  /*const messages = [
    {
      id: 1,
      sender: "me",
      text: "Hello, how are you?",
      time: "14:45",
    },
    {
      id: 2,
      sender: "contact",
      text: "I'm fine. What about you?",
      time: "14:46",
    },
    {
      id: 3,
      sender: "me",
      text: "Hello, how are you?",
      time: "14:45",
    },
    {
      id: 4,
      sender: "contact",
      text: "I'm fine. What about you?",
      time: "14:46",
    },
    {
      id: 5,
      sender: "me",
      text: "Hello, how are you?",
      time: "14:45",
    },
    {
      id: 6,
      sender: "contact",
      text: "I'm fine. What about you?",
      time: "14:46",
    },
    {
      id: 7,
      sender: "contact",
      text: "I'm fine. What about you?",
      time: "14:46",
    },
    {
      id: 8,
      sender: "me",
      text: "Hello, how are you?",
      time: "14:45",
    },
    {
      id: 9,
      sender: "me",
      text: "Hello, how are you?",
      time: "14:45",
    },


  ];*/

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    socket.emit("stop-typing", {
      chatId: selectedChat.id,
      userId: user.id,
    });

    try {
      await sendMessage(selectedChat.id, messageInput);

      setMessageInput("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("Socket listener registered");

    const handleReceiveMessage = (message) => {
      if (message.senderId !== user.id) {
        const audio = new Audio(boneSound);
        audio.play().catch(console.error);
      }

      setMessages((prev) => [...prev, message]);

      if (selectedChat?.id === message.chatId && message.senderId !== user.id) {
        console.log("📤 Emitting mark-read", message.id);

        socket.emit("mark-read", {
          chatId: message.chatId,
          userId: user.id,
        });
      }
    };

    const handleUserTyping = (data) => {
      console.log("Typing event:", data);

      if (data.userId === user.id) return;

      setTypingChats((prev) => ({
        ...prev,
        [data.chatId]: data.fullName,
      }));
    };

    const handleUserStopTyping = (data) => {
      setTypingChats((prev) => {
        const updated = { ...prev };
        delete updated[data.chatId];
        return updated;
      });
    };

    const handleMessagesRead = ({ chatId }) => {
      if (chatId !== selectedChat?.id) return;

      setMessages((prev) =>
        prev.map((message) =>
          message.senderId === user.id
            ? { ...message, status: "READ" }
            : message,
        ),
      );
    };

    socket.on("messages-read", handleMessagesRead);
    socket.on("receive-message", handleReceiveMessage);
    socket.on("user-typing", handleUserTyping);
    socket.on("user-stop-typing", handleUserStopTyping);

    return () => {
      socket.off("messages-read", handleMessagesRead);
      socket.off("receive-message", handleReceiveMessage);
      socket.off("user-typing", handleUserTyping);
      socket.off("user-stop-typing", handleUserStopTyping);
    };
  }, [selectedChat, user]);

  const otherParticipant = selectedChat?.participants?.find(
    (participant) => participant.user.id !== user.id,
  );

  return (
    <div
      className={`message-display-section ${
        !selectedChat ? "hide-messages" : ""
      }`}
    >
      <div className="message-header">
        <div className="message-left-section">
          <ArrowLeft
            className="back-button"
            onClick={() => {
              socket.emit("leave-chat", selectedChat.id);
              setSelectedChat(null);
            }}
          />

          <img
            src={
              selectedChat?.isGroup
                ? `http://localhost:5000${
                    selectedChat.groupImage ||
                    "/images/chatapp-default-group.jpeg"
                  }`
                : `http://localhost:5000${
                    otherParticipant?.user.profilePicture ||
                    "/images/chatapp-default-avatar.jpeg"
                  }`
            }
            alt=""
            className="profile-pic"
          />

          <div>
            <div className="messager-name">
              {selectedChat?.isGroup
                ? selectedChat.groupName
                : otherParticipant?.user.fullName}
            </div>

            <div className="active-or-offline-detail">
              {typingChats[selectedChat?.id] &&
              typingChats[selectedChat.id] !== user.fullName
                ? `typing...`
                : selectedChat?.isGroup
                  ? "Group"
                  : "Active now"}
            </div>
          </div>
        </div>

        <div className="message-right-section" ref={menuRef}>
          <EllipsisVertical
            className="three-dot"
            onClick={() => setShowMenu(!showMenu)}
          />

          {showMenu && (
            <div className="message-options">
              <div className="message-option">Clear Chat</div>

              <div
                className="message-option"
                onClick={async () => {
                  try {
                    await blockChat(selectedChat.id);

                    setShowMenu(false);
                    setSelectedChat(null);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Block
              </div>

              <div className="message-option delete-option">Delete</div>
            </div>
          )}
        </div>
      </div>

      <div className="message-section">
        {Object.entries(groupedMessages).map(([date, dayMessages]) => (
          <div className="day-messages" key={date}>
            <div className="message-date">{date}</div>

            {dayMessages.map((message) => (
              <div
                key={message.id}
                className={
                  message.senderId === user.id
                    ? "my-message"
                    : "contact-message"
                }
              >
                <div
                  className={
                    message.senderId === user.id
                      ? "right-message"
                      : "left-message"
                  }
                >
                  {selectedChat?.isGroup && message.senderId !== user.id && (
                    <div className="sender-name">{message.sender.fullName}</div>
                  )}

                  <div className="message">{message.content}</div>

                  <div className="message-footer">
                    <div className="message-time">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>

                    {message.senderId === user.id && (
                      <div className="message-status">
                        {message.status || "SENT"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="type-section">
        <input
          type="text"
          className="text-type"
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => {
            setMessageInput(e.target.value);

            console.log("Emitting typing:", {
              chatId: selectedChat.id,
              userId: user.id,
              fullName: user.fullName,
            });

            socket.emit("typing", {
              chatId: selectedChat.id,
              userId: user.id,
              fullName: user.fullName,
            });

            clearTimeout(typingTimeout.current);

            typingTimeout.current = setTimeout(() => {
              socket.emit("stop-typing", {
                chatId: selectedChat.id,
                userId: user.id,
              });
            }, 1000);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />

        <button className="send-button" onClick={handleSendMessage}>
          <SendHorizontal size={22} />
        </button>
      </div>
    </div>
  );
}

export default MessageDisplay;
