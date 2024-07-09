import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaylistPost from './PlayListPost';
import RelatedMusic from './RelatedMusic';
import MusicPlayer from './MusicPlayer';
import Download from './Download';
import Loader from './Loader';
import NavBar from './NavBar';
import SupportChatMode from './SupportChatMode';
import SearchMode from './SearchMode';
import HeaderHero from './HeaderHero';
import Footer from './Footer';
import Backtotop from './Backtotop';

const Album = () => {
    const { songId } = useParams();
    const [songData, setSongData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSongData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/songs/${songId}`); 
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSongData(data); 
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
        };

        fetchSongData();
    }, [songId]);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [audio] = useState(new Audio());

    const handleSongClick = (index) => {
        setCurrentSongIndex(index);
        setIsPlaying(true);
        audio.src = songData.playlist.songs[index].src; 
        audio.play();
    };

    const handlePlayPauseClick = () => {
        if (isPlaying) {
        audio.pause();
        } else {
        audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleNextSong = () => {
        const nextIndex = (currentSongIndex + 1) % songData.playlist.songs.length; 
        handleSongClick(nextIndex);
    };

    const handlePrevSong = () => {
        const prevIndex =
        (currentSongIndex - 1 + songData.playlist.songs.length) % songData.playlist.songs.length; 
        handleSongClick(prevIndex);
    };

    audio.onended = () => {
        handleNextSong();
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!songData) {
        return <div>Không tìm thấy bài hát.</div>;
    }

    return (
        <div>
        <Loader />
        <NavBar />
        <SupportChatMode />
        <SearchMode />
        <HeaderHero />
        <main>
            <PlaylistPost
            playlist={songData.playlist} 
            onSongClick={handleSongClick}
            isPlaying={isPlaying}
            isLiked={isLiked}
            onLikeClick={handleLikeClick}
            currentSongIndex={currentSongIndex}
            />
            <RelatedMusic relatedMusics={songData.relatedMusics} /> 
            <MusicPlayer
            currentSong={songData.playlist.songs[currentSongIndex]} 
            isPlaying={isPlaying}
            onPlayPauseClick={handlePlayPauseClick}
            onLikeClick={handleLikeClick}
            isLiked={isLiked}
            />

            <Download currentSong={songData.playlist.songs[currentSongIndex]} /> 
        </main>
        <Footer />
        <Backtotop />
        </div>
    );
};

export default Album;