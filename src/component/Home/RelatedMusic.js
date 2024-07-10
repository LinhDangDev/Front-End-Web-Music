import React from 'react';
import { Link } from 'react-router-dom';
import SongService from '../../services/SongService';

const RelatedMusic = ({ relatedMusics }) => {
    const handleDownloadSong = async (fileName) => {
        try {
            const link = `http://localhost:8080/music/${fileName}`;
            const response = await fetch(link);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));

            const aTag = document.createElement('a');
            aTag.href = url;
            aTag.setAttribute('download', fileName);
            document.body.appendChild(aTag);
            aTag.click();
            document.body.removeChild(aTag);
        } catch (err) {
            console.error('Download failed: ' + err);
        }
    };

    const handleOnClickLike = async (songId) => {
        const span = document.getElementById(`like${songId}`);
        if (span.className == "far fa-heart") {
            SongService.likeSong(songId).catch(err => {
                console.error('Like song failed: ' + err)
            });
            span.className = "fa-solid fa-heart";
        }
        else {
            SongService.subLikeSong(songId).catch(err => {
                console.error('Like song failed: ' + err)
            });
            span.className = "far fa-heart";
        }
    };

    const togglePlay = (songId) => {
        const audio = document.getElementById(songId);
        const span = document.getElementById(`span${songId}`);

        if (audio.paused) {
            audio.play();
            span.className = "far fa-stop";
        } else {
            audio.pause();
            span.className = "far fa-play";
        }

        // Pause remaining audios
        const list_audios = document.getElementsByTagName('audio');
        Array.from(list_audios).forEach((aud) => {
            if (aud !== audio) aud.pause();
        });

        // Reset other spans
        const list_spans = document.getElementsByClassName("far fa-stop");
        Array.from(list_spans).forEach((sp) => {
            if (sp !== span) sp.className = "far fa-play";
        });
    };

    return (
        <section className="section-trending" id="trending">
            <div>
                <h2>Related Music</h2>
            </div>

            <div className="card-grid-slider">
                {relatedMusics.map((group, groupIndex) => (
                    <div className="card-group-grid" key={groupIndex}>
                        {group.map((item) => (
                            <div className="card-playing-horizontal" key={item.songId}>
                                <figure className="card-playing-horizontal-header">
                                    <div>
                                        <span
                                            id={`span${item.songId}`}
                                            className="far fa-play"
                                            onClick={() => togglePlay(item.songId)}
                                        ></span>
                                    </div>
                                    <Link to={`/song/${item.songId}`}>
                                        <img src={`http://localhost:8080/img/${item.coverImage}`} alt={item.songTitle} />
                                    </Link>
                                    <audio id={item.songId}>
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
                                        onClick={() => handleOnClickLike(item.songId)}
                                        title="Like"
                                        aria-label="Like"
                                    >
                                        <span className="far fa-heart"></span>
                                    </a>
                                    <a
                                        onClick={() => handleDownloadSong(item.filePath)}
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
};

export default RelatedMusic;