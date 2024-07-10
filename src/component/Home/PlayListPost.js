import React from 'react';
import { Link } from 'react-router-dom';
import './Playlistpost.css';

const PlayListPost = ({ playlist, onSongClick, isPlaying, onLikeClick, isLiked, currentSongIndex }) => {
  const handleDownload = async (fileName) => {
    var link = `http://localhost:8080/music/${fileName}`;
    const response = await fetch(link);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(new Blob([blob]));

    const aTag = document.createElement('a');
    aTag.href = url;
    aTag.setAttribute('download', fileName);
    document.body.appendChild(aTag);
    aTag.click();

    document.body.removeChild(aTag);
  };

  return (
    <section className="section-playlist-post">
      <div className="section-playlist-post-header">
        <h2>{playlist.albumName}</h2>
        <p>
          {playlist.artist.artistName} • {playlist.releaseDate} • {playlist.songs.length} Songs
        </p>
      </div>
      <div className="section-playlist-post-body">
        <ul>
          {playlist.songs.map((song, index) => (
            <li
              key={index}
              className={`section-playlist-post-play-card ${currentSongIndex === index ? 'active' : ''}`}
              onClick={() => onSongClick(index)} 
            >
              <div>
                {/* Truyền index vào hàm onSongClick để biết bài hát nào được click */}
                {isPlaying && currentSongIndex === index ? ( 
                  <span
                    className="far fa-pause pauseBtnPlayCardToggle"
                    title="Pause"
                    aria-label="Pause"
                  ></span>
                ) : (
                  <span
                    className="far fa-play playBtnPlayCardToggle"
                    title="Play"
                    aria-label="Play"
                  ></span>
                )}
                <h4>
                  <Link to={`/songs/${song.songId}/play`}>{song.songTitle}</Link>
                </h4>
              </div>
              <div>
                <div>
                  <span
                    className="far fa-download"
                    title="Download"
                    aria-label="Download"
                    onClick={() => handleDownload(song.filePath)}
                  ></span>
                  <span
                    className={`far fa-heart ${isLiked && currentSongIndex === index ? 'likeMusicHeaderToggle' : ''
                      }`}
                    onClick={onLikeClick}
                    title="Like"
                    aria-label="Like"
                  ></span>
                </div>
                <p>{song.duration}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="section-playlist-post-footer">
        <p>© {playlist.artist.artistName}</p>
      </div>
    </section>
  );
};

export default PlayListPost;