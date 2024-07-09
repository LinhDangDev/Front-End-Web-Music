import React from 'react';
import { Link } from 'react-router-dom'; 
const PlayListPost = ({ playlist, onSongClick, isPlaying, onLikeClick, isLiked, currentSongIndex }) => {
    return (
    <section className="section-playlist-post">
        <div className="section-playlist-post-header">
        <h2>{playlist.title}</h2>
        <p>
            {playlist.artist} • {playlist.year} • {playlist.songs.length} Songs
        </p>
        </div>
        <div className="section-playlist-post-body">
        {playlist.songs.map((song, index) => (
            <div
                key={index}
                className={`section-playlist-post-play-card ${currentSongIndex === index ? 'active' : ''}`}
                onClick={() => onSongClick(index)}
            >
                <div>
                {isPlaying && currentSongIndex === index ? (
                    <span className="far fa-pause" title="Pause" aria-label="Pause"></span>
                ) : (
                    <span className="far fa-play" title="Play" aria-label="Play"></span>
                )}
                <h4>
                    <Link to={`/song/${song.id}`}>{song.name}</Link>
                </h4>
            </div>
            <div>
                <div>
                    <span className="far fa-download" title="Download" aria-label="Download"></span>
                    <span
                    className={`far fa-heart ${isLiked && currentSongIndex === index ? 'liked' : ''}`}
                    onClick={onLikeClick}
                    title="Like"
                    aria-label="Like"
                    ></span>
                </div>
                <p>{song.duration}</p>
                </div>
            </div>
            ))}
        </div>
        <div className="section-playlist-post-footer">
            <p>© {playlist.artist}</p>
        </div>
    </section>
    );
};

export default PlayListPost;