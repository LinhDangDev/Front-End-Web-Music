import React, { useState, useRef, useEffect } from 'react';

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
    }, []);

    const handleProgressClick = (e) => {
        const progressBar = e.currentTarget;
        const clickPosition = e.nativeEvent.offsetX;
        const newProgress = (clickPosition / progressBar.offsetWidth) * audioRef.current.duration;
        audioRef.current.currentTime = newProgress;
        setSongProgress(newProgress);
    };

    return (
        <section className="section-music-player" id="sectionMusicPlayer">
            <div>
                <img src={`http://localhost:8080/img/${currentSong.coverImage}`} alt={currentSong.songTitle} />
                <div>
                    <h4>{currentSong.songTitle}</h4>
                    <a href="user.html">{currentSong.artistSongs[0].artist.artistName}</a>
                </div>
            </div>
            <div className="section-music-player-timeline" onClick={handleProgressClick}>
                <div
                    className="section-music-player-timeline-linepoint"
                    style={{ width: `${(songProgress / audioRef.current?.duration) * 100 || 0}%` }}
                ></div>
            </div>
            <div>
                <span
                    className={`far fa-heart ${isLiked ? 'liked' : ''}`}
                    onClick={onLikeClick}
                    title="Like"
                    aria-label="Like"
                ></span>&nbsp;
                <span
                    className={`far ${isPlaying ? 'fa-pause' : 'fa-play'}`}
                    onClick={onPlayPauseClick}
                    title={isPlaying ? 'Pause' : 'Play'}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                ></span>&nbsp;
                <span
                    className="far fa-expand"
                    onClick={() => console.log('Show Full Player')}
                    title="Show Full Player"
                    aria-label="Show Full Player"
                ></span>&nbsp;
            </div>
            <audio ref={audioRef} src={`http://localhost:8080/music/${currentSong.filePath}`}></audio>
        </section>
    );
};

export default MusicPlayer;