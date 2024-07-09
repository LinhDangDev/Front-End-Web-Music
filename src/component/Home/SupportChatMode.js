import React from 'react';


const SupportChatMode = () => {
  // Function to close the chat mode (replace with your actual logic)
const supportChatMode = () => {
// Add your close chat logic here
};

return (
<div className="overlay-support-chat-mode" id="supportChatMode">
    <div className="support-chat-mode">
    {/* CHAT HEADER */}
    <div className="support-chat-mode-header">
        <h4>
        Support{' '}
        <img
            src="images/logo/PNG/Audiospark_Logo_Icon/Audiospark_Logo_Icon@2400.png"
            alt=""
            title="Audiospark Bot"
        />
        </h4>
        <a href="javascript:void(0)" onClick={supportChatMode}>
        <span className="far fa-close"></span>
        </a>
    </div>

    {/* CHAT BODY */}
    <div className="support-chat-mode-body">
        <div className="chat-date">Today, September 26, 2023</div>
        <div className="section-message-bot">
        <img
            src="images/logo/PNG/Audiospark_Logo_Icon/Audiospark_Logo_Icon@2400.png"
            alt=""
        />
        <p>Hello! How can I assist you today?</p>
        </div>
        <div className="section-message-user">
        <img src="images/avatar/avatar-1.png" alt="" />
        <p>Hi</p>
        <p>How to download as musics ZIP ???</p>
        </div>
        <div className="section-message-bot">
        <img
            src="images/logo/PNG/Audiospark_Logo_Icon/Audiospark_Logo_Icon@2400.png"
            alt=""
        />
        <p>
            You most first click on the 'DOWNLOAD' button to automatically
            download ZIP file after a few seconds.
            <br />
            <br />
            If you have a problem, are you ready to be responsive to you.
        </p>
        </div>
        <div className="section-message-user">
        <img src="images/avatar/avatar-1.png" alt="" />
        <p>Thank you very much for your problem.</p>
        <p>🙏🙏🙏</p>
        </div>
    </div>

    {/* CHAT FOOTER */}
    <div className="support-chat-mode-footer">
        <form action="" method="post">
        <span className="far fa-paperclip" onClick={() => {}}></span>
        <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            placeholder="Write a message..."
            aria-placeholder="Write a message..."
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