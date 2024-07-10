import React from 'react';
import { Link } from 'react-router-dom';
import SongService from "../../services/SongService"
var SONGS, ALLSONGS;
class Trending extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        }
    }
    componentDidMount() {
        SongService.getAll().then((res) => {
            ALLSONGS = SONGS = res.result;
            SONGS = SONGS.sort((a, b) => b.likes - a.likes).slice(0, 6);
            // split 3
            SONGS = splitArrayGroup(SONGS);
            ALLSONGS = splitArrayGroup(ALLSONGS);

            this.setState({ songs: SONGS });
        }).catch(err => {
            console.error('Get songs failed: ' + err);
        });;
    }
    handleSeeAll = () => {
        const temp = SONGS;
        SONGS = ALLSONGS;
        ALLSONGS = temp;
        this.setState({ songs: SONGS })
    }
    handleDownloadSong = async (fileName) => {
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
    handleOnClickLike = (song) => {
        console.log(song);
        song.likes++;
        SongService.editSong(song.songId, song).catch(err => {
            console.error('Update song failed: ' + err)
        });
    }
    togglePlay = (songId) => {
        const audio = document.getElementById(songId);
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        const span = document.getElementById(`span${songId}`);
        if (span.className == "far fa-stop") {
            span.className = "far fa-play"
        }
        else {
            span.className = "far fa-stop";
        }

        // pause remaning audios
        var list_audios = document.getElementsByTagName('audio');
        for (var i = 0, len = list_audios.length; i < len; i++) {
            if (list_audios[i] != audio)
                list_audios[i].pause();
        }
        try {
            var list_spans = document.getElementsByClassName("far fa-stop");
            for (var i = 0, len = list_spans.length; i < len; i++) {
                if (list_spans[i] != span)
                    list_spans[i].className = "far fa-play";
            }
        } catch (err) { }

    }
    render() {
        return (
            <section className="section-trending" id="trending">
                <div>
                    <h2>Trending</h2>
                    <p onClick={this.handleSeeAll}>See all</p>
                </div>

                <div className="card-grid-slider">
                    {this.state.songs.map((group, groupIndex) => (
                        <div className="card-group-grid" key={groupIndex}>
                            {group.map((item) => (
                                <div className="card-playing-horizontal" key={item.songId}>
                                    <figure className="card-playing-horizontal-header">
                                        <div>
                                            <span id={`span${item.songId}`}
                                                className="far fa-play"
                                                onClick={() => this.togglePlay(item.songId)}
                                            ></span>
                                        </div>
                                        <Link to={`/song/${item.songId}`}>
                                            <img src={`http://localhost:8080/img/${item.coverImage}`} alt={item.songTitle} />
                                        </Link>
                                        <audio id={item.songId} ref={(audio) => { this.audioElement = audio; }}>
                                            <source src={`http://localhost:8080/music/${item.filePath}`} type="audio/mp3" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </figure>
                                    <div className="card-playing-horizontal-body">
                                        <h4>
                                            <Link to={`/song/${item.songId}`}>{item.songTitle}</Link>
                                        </h4>
                                        <p>
                                            <Link to={`/artist/${item.artistSongs[0].artist.artistId}`}>
                                                {item.artistSongs[0].artist.artistName}
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="card-playing-horizontal-footer">
                                        <a
                                            onClick={() => this.handleOnClickLike(item)}
                                            title="Like"
                                            aria-label="Like"
                                        >
                                            <span className="far fa-heart"></span>
                                        </a>
                                        <a
                                            onClick={() => this.handleDownloadSong(item.filePath)}
                                            title="Download"
                                            aria-label="Download"
                                        >
                                            <span className="far fa-download"></span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        );
    }

};
function splitArrayGroup(arrSongs) {
    let chunkSize = 3; // Kích thước của mỗi mảng con
    let groupedArray = [];
    for (let i = 0; i < arrSongs.length; i += chunkSize) {
        groupedArray.push(arrSongs.slice(i, i + chunkSize));
    }
    return groupedArray;
}


export default Trending;