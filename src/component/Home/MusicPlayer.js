import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';
import { Link } from 'react-router-dom';

const MusicPlayer = ({ currentSong, isPlaying, onPlayPauseClick, onLikeClick, isLiked }) => {
  const [songProgress, setSongProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSongProgress(audioRef.current.currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentSong]);

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const newProgress = (clickPosition / progressBar.offsetWidth) * audioRef.current.duration;
    audioRef.current.currentTime = newProgress;
    setSongProgress(newProgress);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <section className="music-player" id="sectionMusicPlayer">
      <div className="player-content">
        <div className="section">
          <img src={`http://localhost:8080/img/${currentSong.coverImage}`} alt={currentSong.songTitle} />
          <div className="song-info">
            <h4>{currentSong.songTitle}</h4>
            <p>{currentSong.artistSongs[0].artist.artistName}</p>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="section progress-section"> {/* Added a specific class for progress bar section */}
          <div className="song-progress">
            <input
              type="range"
              min="0"
              max={audioRef.current?.duration || 0}
              value={songProgress}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
                setSongProgress(e.target.value);
              }}
            />
            <div className="time-display">
              <span className="current-time">{formatTime(songProgress)}</span>
              <span className="total-time">{formatTime(audioRef.current?.duration || 0)}</span>
            </div>
          </div>
        </div>

        <div className="section controls">
          <span
            className={`far fa-heart ${isLiked ? 'liked' : ''}`}
            onClick={onLikeClick}
            title="Like"
            aria-label="Like"
          ></span>
          <span
            className={`far ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'} play-button`}
            onClick={onPlayPauseClick}
            title={isPlaying ? 'Pause' : 'Play'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          ></span>
          <Link to={`/songs/${currentSong.songID}/play`}>
            <span
                    className="far fa-expand"
                    title="Show Full Player"
                    aria-label="Show Full Player"
            ></span>
            </Link>
        </div>
      </div>

      <audio ref={audioRef} src={`http://localhost:8080/music/${currentSong.filePath}`}></audio>
    </section>
  );
};

export default MusicPlayer;