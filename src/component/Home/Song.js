import React from 'react';

import PlaylistPost from './PlayListPost';
import RelatedMusic from './RelatedMusic';
import MusicPlayer from './MusicPlayer';
import FullPlayer from './FullPlayer';
import Download from './Download';
import Loader from './Loader';
import NavBar from './NavBar';
import SupportChatMode from './SupportChatMode';
import SearchMode from './SearchMode';
import HeaderHero from './HeaderHero';
import Footer from './Footer';
import Backtotop from './Backtotop';

class Songs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getSong: null,
            playlist: {
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
                    // ... Other songs
                ],
            },
            relatedMusics: null,
            currentSongIndex: 0,
            isPlaying: false,
            isLiked: false,
            audio: new Audio(),
        };
    }

    componentDidMount() {
        const { audio } = this.state;
        audio.onended = this.handleNextSong;
        if (this.props.location.state) {
            const { song, relatedMusic } = this.props.location.state;
            this.setState({
                getSong: song,
                relatedMusics: relatedMusic // Assuming relatedMusic is also passed
            });
            console.log("hello");
        }
        console.log(this.state.getSong)
    }

    handleSongClick = () => {
        const { audio } = this.state;
        this.setState({ isPlaying: true });
        audio.src = this.state.song.filePath;
        audio.play();
    };

    handlePlayPauseClick = () => {
        const { audio, isPlaying } = this.state;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        this.setState({ isPlaying: !isPlaying });
    };

    handleLikeClick = () => {
        this.setState((prevState) => ({ isLiked: !prevState.isLiked }));
    };

    handleNextSong = () => {
        const { currentSongIndex, playlist } = this.state;
        const nextIndex = (currentSongIndex + 1) % playlist.songs.length;
        this.handleSongClick(nextIndex);
    };

    handlePrevSong = () => {
        const { currentSongIndex, playlist } = this.state;
        const prevIndex =
            (currentSongIndex - 1 + playlist.songs.length) % playlist.songs.length;
        this.handleSongClick(prevIndex);
    };

    render() {
        const { playlist, relatedMusics, currentSongIndex, isPlaying, isLiked } = this.state;
        return (
            <div>
                <Loader />
                <NavBar />
                <SupportChatMode />
                <SearchMode />
                <HeaderHero />
                <main>
                    <PlaylistPost
                        playlist={playlist}
                        onSongClick={this.handleSongClick}
                        isPlaying={isPlaying}
                        isLiked={isLiked}
                        onLikeClick={this.handleLikeClick}
                        currentSongIndex={currentSongIndex}
                    />
                    <RelatedMusic relatedMusics={relatedMusics} />
                    <MusicPlayer
                        currentSong={playlist.songs[currentSongIndex]}
                        isPlaying={isPlaying}
                        onPlayPauseClick={this.handlePlayPauseClick}
                        onLikeClick={this.handleLikeClick}
                        isLiked={isLiked}
                    />
                    <FullPlayer
                        currentSong={playlist.songs[currentSongIndex]}
                        onPlayPauseClick={this.handlePlayPauseClick}
                        isPlaying={isPlaying}
                        onNextSong={this.handleNextSong}
                        onPrevSong={this.handlePrevSong}
                    />
                    <Download currentSong={playlist.songs[currentSongIndex]} />
                </main>
                <Footer />
                <Backtotop />
            </div>
        );
    }
}

export default Songs;