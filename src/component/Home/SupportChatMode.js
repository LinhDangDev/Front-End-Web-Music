import React, { useState, useEffect, useRef } from 'react';

const SupportChatMode = () => {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem('chatMessages')) || [
      { role: 'assistant', content: 'Hello! How can I assist you today?' },
    ]
  );
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  const closeChatMode = () => {
    document.getElementById('supportChatMode').style.display = 'none';
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (userInput.trim() !== '') {
      setMessages([...messages, { role: 'user', content: userInput }]);

      try {
        let responseMessage = '';

        if (userInput.toLowerCase().includes('nhóm tác giả')) {
          responseMessage = 'Tác giả trang web là Dung, Đạt, Linh, Thạch.';
        } else {
          const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=YOUR_API_KEY',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contents: [{ parts: [{ text: userInput }] }],
              }),
            }
          );

          const data = await response.json();
          if (data.candidates && data.candidates.length > 0) {
            responseMessage = data.candidates[0].content.parts[0].text;
          } else {
            responseMessage = "I'm sorry, I didn't understand that.";
          }
        }

        setMessages([
          ...messages,
          { role: 'assistant', content: responseMessage },
        ]);
        setUserInput(''); // Clear user input after sending
      } catch (error) {
        console.error('Error fetching response:', error);
        setMessages([
          ...messages,
          {
            role: 'assistant',
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

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="overlay-support-chat-mode" id="supportChatMode">
      <div className="support-chat-mode">
        <div className="support-chat-mode-header">
          <h4>
            Support{' '}
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
            <div key={index} className={`section-message-${message.role}`}>
              {message.role === 'user' && (
                <div className="user-message">
                  <img src="images/avatar/avatar-1.png" alt="" />
                  <p>{message.content}</p>
                </div>
              )}
              {message.role === 'assistant' && (
                <div className="assistant-message">
                  <p>{message.content}</p> 
                  <img
                    src="images/logo/svg/Audiospark_Logo_Icon.svg"
                    alt=""
                  />
                </div>
              )}
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