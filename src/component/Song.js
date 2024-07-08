import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaylistPost from './PlayListPost'; 
import RelatedMusic from './RelatedMusic'; // Sửa đường dẫn import
import MusicPlayer from './MusicPlayer'; // Sửa đường dẫn import
import FullPlayer from './FullPlayer'; // Sửa đường dẫn import
import Download from './Download'; // Sửa đường dẫn import
import Loader from './Loader';
import NavBar from './NavBar';
import SupportChatMode from './SupportChatMode';
import SearchMode from './SearchMode';
import HeaderHero from './HeaderHero';
import Footer from './Footer';
import Backtotop from './Backtotop';


// const Songs = () => {
//     const { id } = useParams();
//     const [songData, setSongData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

// useEffect(() => {
//     // Simulate fetching song data from API
//     const fetchData = async () => {
//     try {
//         // Replace with actual API call
//         const response = await new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//             data: {
//                 playlist: {
//                 title: 'Playlist for Song ID: ' + id,
//                 artist: 'Ultima Trailer Music',
//                 year: 2021,
//                 songs: [
//                     {
//                     id: 1,
//                     name: 'Helix Angle',
//                     duration: '1:39',
//                     src: 'musics/1.mp3',
//                     },
//                     {
//                     id: 2,
//                     name: 'Enforcement',
//                     duration: '1:30',
//                     src: 'musics/1.mp3',
//                     },
//                     // ... Các bài hát khác
//                 ],
//                 },
//                 relatedMusics: [
//                 [
//                     {
//                     title: 'Undefeated',
//                     artist: 'Amadea Music Productions',
//                     cover: 'images/covers/Undefeated-Amadea-Music-Productions-400x400.jpeg',
//                     },
//                     // ... Các bài hát khác trong nhóm 1
//                 ],
//                 // ... Các nhóm nhạc khác
//                 ],
//             },
//             });
//         }, 1000); // Simulate 1-second API call delay
//         });
//         setSongData(response.data);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     } finally {
//         setIsLoading(false);
//     }
//     };

//     fetchData();
// }, [id]);

const Songs = () => {
    const playlist = {
        title: 'Playlist',
        artist: 'Ultima Trailer Music',
        year: 2021,
        songs: [
        {
        id: 1,
        name: 'Helix Angle',
        duration: '1:39',
        src: 'musics/1.mp3',
        },
        {
        id: 2,
        name: 'Enforcement',
        duration: '1:30',
        src: 'musics/1.mp3',
        },
        // ... Các bài hát khác
    ],
    };

    const relatedMusics = [
    [
        {
        title: 'Undefeated',
        artist: 'Amadea Music Productions',
        cover: 'images/covers/Undefeated-Amadea-Music-Productions-400x400.jpeg',
        },
        // ... Các bài hát khác trong nhóm 1
    ],
    // ... Các nhóm nhạc khác
    ];

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [audio] = useState(new Audio());

    const handleSongClick = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    audio.src = playlist.songs[index].src;
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
    const nextIndex = (currentSongIndex + 1) % playlist.songs.length;
    handleSongClick(nextIndex);
    };

    const handlePrevSong = () => {
    const prevIndex =
        (currentSongIndex - 1 + playlist.songs.length) % playlist.songs.length;
    handleSongClick(prevIndex);
    };

    audio.onended = () => {
    handleNextSong();
    };
    // if (isLoading) {
    //     return <div>Loading...</div>;
    //   }
    
    //   if (!songData) {
    //     return <div>Song not found.</div>;
    //   }
    return (
        <div>
        <Loader/>
        <NavBar />
        <SupportChatMode/>
        <SearchMode />
        <HeaderHero/>
        <main>
            <PlaylistPost
                playlist={playlist}
                onSongClick={handleSongClick}
                isPlaying={isPlaying}
                isLiked={isLiked}
                onLikeClick={handleLikeClick}
                currentSongIndex={currentSongIndex}
            />
            <RelatedMusic relatedMusics={relatedMusics} />
            <MusicPlayer
                currentSong={playlist.songs[currentSongIndex]}
                isPlaying={isPlaying}
                onPlayPauseClick={handlePlayPauseClick}
                onLikeClick={handleLikeClick}
                isLiked={isLiked}
            />
            <FullPlayer
                currentSong={playlist.songs[currentSongIndex]}
                onPlayPauseClick={handlePlayPauseClick}
                isPlaying={isPlaying}
                onNextSong={handleNextSong}
                onPrevSong={handlePrevSong}
            />
            <Download currentSong={playlist.songs[currentSongIndex]} />
        </main>
        <Footer/>
        <Backtotop/>
    </div>
    );
    };

export default Songs;
    