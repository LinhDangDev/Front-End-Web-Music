import React from 'react';

const Download = ({ currentSong, onClose }) => {

    return (
    <div className="overlay-section-download" id="download">
        <section className="section-download">
        <div className="section-download-header">
            <h4>{currentSong.title}</h4>
            <span className="far fa-close" onClick={onClose} title="Close" aria-label="Close"></span>
        </div>
        <div className="section-download-body">
            <img src={currentSong.artistAvatar} alt={currentSong.artist} />
            <h3>Say thanks to {currentSong.artist}</h3>
            <p>
            By downloading, you agree to our <a href="#">License</a>
            </p>
            <a href="user.html" className="btn-secondary">
            Profile
            </a>
        </div>
        </section>
    </div>
    );
};

export default Download;