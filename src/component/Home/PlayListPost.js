import React from 'react';
import { Link } from 'react-router-dom';
const PlayListPost = ({ playlist, onSongClick, isPlaying, onLikeClick, isLiked, currentSongIndex }) => {
    const handleDownload = async (fileName) => {
        var link = `http://localhost:8080/music/${fileName}`;
        // create custom fetch for user to download
        const response = await fetch(link);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(new Blob([blob]));

        const aTag = document.createElement('a');
        aTag.href = url;
        aTag.setAttribute('download', fileName);
        document.body.appendChild(aTag);
        aTag.click();

        document.body.removeChild(aTag);
    }
    return (
        <section className="section-playlist-post">
            <div className="section-playlist-post-header">
                <h2>{playlist.albumName}</h2>
                <p>
                    {playlist.artist.artistName} • {playlist.releaseDate} • {playlist.songs.length} Songs
                </p>
            </div>
            <div className="section-playlist-post-body">
                {playlist.songs.map((song, index) => (
                    <div
                        key={index}
                        className={`section-playlist-post-play-card ${currentSongIndex === index ? 'active' : ''}`}
                    >
                        <div>
                            {isPlaying && currentSongIndex === index ? (
                                <span className="far fa-pause" title="Pause" aria-label="Pause"></span>
                            ) : (
                                <span className="far fa-play" title="Play" aria-label="Play" onClick={() => onSongClick(index)}></span>
                            )}
                            <h4>
                                <Link to={`/song/${song.songId}`}>{song.songTitle}</Link>
                            </h4>
                        </div>
                        <div>
                            <div>
                                <span className="far fa-download" title="Download" aria-label="Download" onClick={() => handleDownload(song.filePath)}></span>
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
                <p>© {playlist.artist.artistName}</p>
            </div>
        </section>
    );
};

export default PlayListPost;