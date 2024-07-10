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
import SongService from '../../services/SongService';
import AlbumService from '../../services/AlbumService';
import ArtistSongService from '../../services/ArtistSongService';

var query;
var RELATED_MUSIC, prev_query;
class Songs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryUrl: null,
            album: null,
            relatedMusics: [],
            currentSongIndex: 0,
            isPlaying: false,
            isLiked: false,
            audio: new Audio(),
        };
    }

    componentDidMount() {
        query = window.location.pathname.split('/').pop()
        this.handleGetData();
    }
    componentDidUpdate() {
        if (query != prev_query)
            this.handleGetData();
    }
    handleGetData = () => {
        const { audio } = this.state;
        audio.onended = this.handleNextSong;
        this.setState({ queryUrl: query })
        let ARTIST_SONGS = [];
        let ALBUM = null;
        let SONGS = [];
        prev_query = query
        ArtistSongService.getAll()
            .then((res) => {
                ARTIST_SONGS = res.result;
                return AlbumService.getAlbum(this.state.queryUrl);
            })
            .then((res) => {
                ALBUM = res.result;
                ALBUM = addArtistIntoAlbums(ARTIST_SONGS, ALBUM);
                return SongService.getAll();
            })
            .then((res) => {
                SONGS = res.result;
                RELATED_MUSIC = SONGS.sort((a, b) => b.likes - a.likes).slice(0, 9);
                RELATED_MUSIC = splitArrayGroup(RELATED_MUSIC);
                ALBUM = insertSongIntoAlbum(ALBUM, SONGS);
                this.setState({ album: ALBUM, relatedMusics: RELATED_MUSIC });
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    }

    handleSongClick = (index) => {
        const { audio } = this.state;
        this.setState({ isPlaying: true, currentSongIndex: index });
        audio.src = `http://localhost:8080/music/${this.state.album.songs[index].filePath}`;
        audio.play();
    };

    handlePlayPauseClick = () => {
        const { audio, isPlaying } = this.state;
        try {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        } catch (err) { }
        this.setState({ isPlaying: !isPlaying });
    };

    handleLikeClick = () => {
        this.setState((prevState) => ({ isLiked: !prevState.isLiked }));
    };

    handleNextSong = () => {
        const { currentSongIndex, album } = this.state;
        const nextIndex = (currentSongIndex + 1) % album.songs.length;
        this.handleSongClick(nextIndex);
    };

    handlePrevSong = () => {
        const { currentSongIndex, album } = this.state;
        const prevIndex =
            (currentSongIndex - 1 + album.songs.length) % album.songs.length;
        this.handleSongClick(prevIndex);
    };

    render() {
        const { currentSongIndex, isPlaying, isLiked } = this.state;
        return (
            <>
                <div>
                    <Loader />
                    <NavBar />
                    <SupportChatMode />
                    <SearchMode />
                    <HeaderHero />
                    <main>
                        {this.state.album !== null && (
                            <>
                                <PlaylistPost
                                    playlist={this.state.album}
                                    onSongClick={this.handleSongClick}
                                    isPlaying={isPlaying}
                                    isLiked={isLiked}
                                    onLikeClick={this.handleLikeClick}
                                    currentSongIndex={currentSongIndex}
                                />
                                <RelatedMusic relatedMusics={this.state.relatedMusics} />
                                <MusicPlayer
                                    currentSong={this.state.album.songs[currentSongIndex]}
                                    isPlaying={isPlaying}
                                    onPlayPauseClick={this.handlePlayPauseClick}
                                    onLikeClick={this.handleLikeClick}
                                    isLiked={isLiked}
                                />
                                <FullPlayer
                                    currentSong={this.state.album.songs[currentSongIndex]}
                                    onPlayPauseClick={this.handlePlayPauseClick}
                                    isPlaying={isPlaying}
                                    onNextSong={this.handleNextSong}
                                    onPrevSong={this.handlePrevSong}
                                />
                                {/* <Download currentSong={this.state.album.songs[currentSongIndex]} /> */}
                            </>
                        )}
                    </main>
                    <Footer />
                    <Backtotop />
                </div>
            </>
        );
    }
}

function addArtistIntoAlbums(arrArtistSong, album) {
    arrArtistSong.forEach((item) => {
        if (item.artist.albums[0].albumId === album.albumId) {
            album.artist = item.artist;
        }
    });
    return album;

}

function insertSongIntoAlbum(album, arrSongs) {
    let result = [];
    arrSongs.forEach((song) => {
        song.artistSongs.forEach((artistSong) => {
            if (artistSong.artist.artistId === album.artist.artistId) {
                result.push(song);
            }
        });
    });
    album.songs = result;
    return album;
}

function splitArrayGroup(arrSongs) {
    let chunkSize = 3; // Kích thước của mỗi mảng con
    let groupedArray = [];
    for (let i = 0; i < arrSongs.length; i += chunkSize) {
        groupedArray.push(arrSongs.slice(i, i + chunkSize));
    }
    return groupedArray;
}

export default Songs;