    import React, { createContext, useState, useRef, useEffect } from 'react';

    const MusicContext = createContext();

    const MusicProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const audioRef = useRef(new Audio());

    useEffect(() => {
    const handleEnded = () => {
        // Xử lý khi bài hát kết thúc (ví dụ: phát bài hát tiếp theo)
    };

    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
        audioRef.current.removeEventListener('ended', handleEnded);
    };
    }, []);

    const handlePlay = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    audioRef.current.src = `http://localhost:8080/music/${song.filePath}`;
    audioRef.current.play();
    };

    const handlePause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    };

    const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
    };

    const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    };

    const handleLikeClick = () => {
    setIsLiked(!isLiked);
    };

    return (
    <MusicContext.Provider
        value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        isLiked,
        audioRef,
        handlePlay,
        handlePause,
        handleTimeUpdate,
        handleLoadedMetadata,
        handleProgressChange,
        handleLikeClick,
        }}
    >
        {children}
    </MusicContext.Provider>
    );
    };

    export { MusicContext, MusicProvider };