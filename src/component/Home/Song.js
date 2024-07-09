import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import SongService from '../../services/SongService';
import Loader from './Loader';
import { formatTime } from '../../utils/timeUtils';
import './Song.css'; 

const Song = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        setIsLoading(true);
        const response = await SongService.getSongForPlay(id);
        if (response.code === 1000) {
          setSong(response.result);
        } else {
          setError('Failed to fetch song details.');
        }
      } catch (error) {
        console.error('Error fetching song:', error);
        setError('An error occurred while fetching song details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  useEffect(() => {
    if (!isLoading && song && audioRef.current) {
      audioRef.current.load();
    }
  }, [isLoading, song]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
    setCurrentTime(0);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (e.target.value / 100) * duration;
    setCurrentTime(audio.currentTime);
  };

  const handleLoopClick = () => {
    setIsLooping(!isLooping);
    audioRef.current.loop = !isLooping;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!song) {
    return <div>Song not found</div>;
  }

  return (
    <div className="song-page">
      <div className="song-header">
        <Link to="/" className="back-button">
          <span className="far fa-angle-left" title="Back" aria-label="Back"></span>
        </Link>
        <p className="now-playing">Now Playing</p>
        <span className="song-options far fa-ellipsis-h"></span>
      </div>

      <div className="song-content">
        <img src={song.imageUrl} alt={song.title} className="song-image" />

        <div className="song-info">
          <h2 className="song-title">{song.title}</h2>
          <p className="song-artist">
            <Link to={`/artist/${song.artist.id}`}>{song.artist}</Link>
          </p>
        </div>

        <div className="song-progress">
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleProgressChange}
          />
          <div className="time-display">
            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="player-controls">
          <button className="control-button">
            <span className="far fa-random"></span>
          </button>
          <button className="control-button">
            <span className="far fa-step-backward"></span>
          </button>
          <button className="control-button play-pause" onClick={handlePlayPause}>
            <span className={`far ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'}`}></span>
          </button>
          <button className="control-button">
            <span className="far fa-step-forward"></span>
          </button>
          <button className="control-button" onClick={handleLoopClick}>
            <span className={`far fa-refresh ${isLooping ? 'active' : ''}`}></span>
          </button>
        </div>

        <div className="song-actions">
          <button className="control-button">
            <span className="far fa-heart"></span>
          </button>
        </div>
      </div>

      {/* Audio element for playing music */}
      <audio
        ref={audioRef}
        src={song.musicUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
};

export default Song;