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

var query = window.location.pathname.split('/').pop();
var ARTIST_SONGS, SONGS, ALBUM;
class Songs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            album: null,
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
        query = query + 1 - 1;
        if (Number.isInteger(query)) {
            ArtistSongService.getAll().then((res1) => {
                ARTIST_SONGS = res1.result;
            }).catch(err => {
                console.error('Get artist_songs failed: ' + err);
            });
            AlbumService.getAlbum(query).then((res2) => {
                ALBUM = res2.result;
            }).catch(err => {
                console.error('Get album failed: ' + err);
            });
            ALBUM = addArtistIntoAlbums(ARTIST_SONGS, ALBUM);

            SongService.getAll().then((res3) => {
                SONGS = res3.result;
            }).catch(err => {
                console.error('Get songs failed: ' + err);
            });
            ALBUM = insertSongIntoAlbum(ALBUM, SONGS);
            this.setState({ albm: ALBUM });
        }
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
        const { currentSongIndex, isPlaying, isLiked } = this.state;
        return (
            <>
                {!Number.isInteger(query) ? (
                    <div>There is nothing in here</div>
                ) : (
                    <div>
                        <Loader />
                        <NavBar />
                        <SupportChatMode />
                        <SearchMode />
                        <HeaderHero />
                        <main>
                            {/* <PlaylistPost
                                playlist={this.state.album}
                                onSongClick={this.handleSongClick}
                                isPlaying={isPlaying}
                                isLiked={isLiked}
                                onLikeClick={this.handleLikeClick}
                                currentSongIndex={currentSongIndex}
                            /> */}
                            {/* <RelatedMusic relatedMusics={relatedMusics} />
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
                            <Download currentSong={this.state.album.songs[currentSongIndex]} /> */}
                        </main>
                        <Footer />
                        <Backtotop />
                    </div>
                )}
            </>
        );
    }
}

function addArtistIntoAlbums(arrArtistSong, album) {
    console.log(arrArtistSong);
    arrArtistSong.forEach(item => {
        if (item.artist.albums[0].albumId === album.albumId) {
            album.artist = item.artist;
        }
    });
    return album;

}

function insertSongIntoAlbum(album, arrSongs) {
    arrSongs.foreach(song => {
        song.artistSongs.foreach(artistSong => {
            if (artistSong.artist.artistId === album.artist.artistId)
                album.songs = song;
        })
    })
    return album;
}

export default Songs;