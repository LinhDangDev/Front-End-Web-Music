import React, { useState } from 'react';

const FullPlayer = ({
    currentSong,
    onPlayPauseClick,
    isPlaying,
    onNextSong,
    onPrevSong,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const handleDropdownClick = () => {
setIsDropdownOpen(!isDropdownOpen);
};

    return (
    <section className="section-full-player" id="fullPlayer">
        <div className="section-full-player-header">
        <span
            className="far fa-angle-left"
            title="Back"
            aria-label="Back"
            onClick={() => console.log('Back button clicked!')}
        ></span>
        <h4>Now Playing</h4>
        <span
            className="far fa-ellipsis-h"
            title="More Option"
            aria-label="More Option"
            onClick={handleDropdownClick}
        ></span>

        <div
            className={`section-full-player-header-dropdown ${
            isDropdownOpen ? 'show' : ''
            }`}
            id="fullPlayerHeaderDropdown"
        >
            <a href="">
            <span className="far fa-play-circle"></span> Add To Playlist
            </a>
            <a href="">
            <span className="far fa-info-circle"></span> Help
            </a>
        </div>
        </div>
        <div className="section-full-player-body">
        <figure>
            <img src={currentSong.cover} alt={currentSong.title} />
        </figure>
        <div>
            <div>
            <span className="far fa-heart" title="Like" aria-label="Like"></span>
            </div>
            <div>
            <h3>{currentSong.title}</h3>
            <a href="user.html">{currentSong.artist}</a>
            </div>
            <div>
            <span
                className="far fa-ellipsis-h"
                title="More Option"
                aria-label="More Option"
            ></span>
            </div>
        </div>
        </div>
        <div className="section-full-player-footer">
        <span
            className="far fa-random"
            title="Shuffle"
            aria-label="Shuffle"
        ></span>
        <span
            className="far fa-step-backward"
            title="Backward"
            aria-label="Backward"
            onClick={onPrevSong} 
        ></span>
        <span
            className={`far ${isPlaying ? 'fa-pause' : 'fa-play'}`}
            title={isPlaying ? 'Pause' : 'Play'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={onPlayPauseClick}
        ></span>
        <span
            className="far fa-step-forward"
            title="Forward"
            aria-label="Forward"
            onClick={onNextSong} 
        ></span>
        <span
            className="far fa-refresh"
            title="Repeat"
            aria-label="Repeat"
        ></span>
        </div>
    </section>
    );
};

export default FullPlayer;