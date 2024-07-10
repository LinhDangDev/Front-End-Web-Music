import React, { useState, useEffect, useRef } from "react";

const SupportChatMode = () => {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("chatMessages")) || [
      { role: "assistant", content: "Hello! How can I assist you today?" },
    ]
  );
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);

  const closeChatMode = () => {
    document.getElementById("supportChatMode").style.display = "none";
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (userInput.trim() !== "") {
      setMessages([...messages, { role: "user", content: userInput }]);
      setUserInput("");

      try {
        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=AIzaSyAFZmRWzJhaMFjAsoXFLUswKw8B7OOcFIM",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: userInput }] }],
            }),
          }
        );

        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
          setMessages([
            ...messages,
            {
              role: "assistant",
              content: data.candidates[0].content.parts[0].text,
            },
          ]);
        } else {
          setMessages([
            ...messages,
            {
              role: "assistant",
              content: "I'm sorry, I didn't understand that.",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages([
          ...messages,
          {
            role: "assistant",
            content:
              "I'm having trouble understanding you right now. Please try again later.",
          },
        ]);
      }
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Save messages to localStorage whenever messages array changes
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="overlay-support-chat-mode" id="supportChatMode">
      <div className="support-chat-mode">
        <div className="support-chat-mode-header">
          <h4>
            Support{" "}
            <img
              src="images/logo/PNG/Audiospark_Logo_Icon/Audiospark_Logo_Icon@2400.png"
              alt=""
              title="Audiospark Bot"
            />
          </h4>
          <a href="javascript:void(0)" onClick={closeChatMode}>
            <span className="far fa-close"></span>
          </a>
        </div>

        <div className="support-chat-mode-body">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`section-message-${
                message.role === "assistant" ? "user" : message.role
              }`}
            >
              {message.role === "user" && (
                <img src="images/avatar/avatar-1.png" alt="" />
              )}
              <p>{message.content}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="support-chat-mode-footer">
          <form onSubmit={sendMessage}>
            <span className="far fa-paperclip" onClick={() => {}}></span>
            <textarea
              name=""
              id=""
              cols="30"
              rows="1"
              placeholder="Write a message..."
              aria-placeholder="Write a message..."
              value={userInput}
              onChange={handleInputChange}
            ></textarea>
            <span className="far fa-smile" onClick={() => {}}></span>
            <button
              type="submit"
              className="far fa-chevron-right"
              aria-placeholder="Send"
            ></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportChatMode;
