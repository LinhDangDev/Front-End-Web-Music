import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ArtistService from '../../services/ArtistService';
import Footer from './Footer';
import Loader from './Loader';
import NavBar from './NavBar';
import SearchMode from './SearchMode';
import SupportChatMode from './SupportChatMode';

const Artist = () => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                setLoading(true);

                // Lấy thông tin nghệ sĩ (Bạn cần sửa lại API để lấy thông tin artist)
                const artistResponse = await ArtistService.getArtist(artistId);
                if (artistResponse.code === 1000) {
                    setArtist(artistResponse.result);
                } else {
                    setError('Failed to fetch artist information.');
                }

                // Lấy danh sách bài hát của nghệ sĩ
                const songsResponse = await ArtistService.getSongsByArtist(artistId);
                if (songsResponse.code === 1000) {
                    setSongs(songsResponse.result);
                } else {
                    setError('Failed to fetch songs for this artist.');
                }

            } catch (error) {
                console.error('Error fetching artist data:', error);
                setError('An error occurred while fetching artist data.');
            } finally {
                setLoading(false);
            }
        };

        fetchArtistData();
    }, [artistId]);

    if (loading) {
        return <Loader loading={loading} />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <NavBar />
            <SupportChatMode />
            <SearchMode />

            <main className="user-page">
                {/* Hiển thị thông tin nghệ sĩ */}
                {artist && (
                    <div className="artist-header">
                        <img src={artist.imageUrl} alt={artist.artistName} className="artist-avatar" /> {/* Sử dụng artist.avatar */}
                        <div className="artist-info">
                            <h1 className="artist-name">{artist.artistName}</h1>
                        </div>
                    </div>
                )}

                <section className="section-playlist-post">
                    <div className="section-playlist-post-header">
                        <h2>Songs</h2>
                        <p>{artist ? artist.artistName : ''} • <span>{songs.length}</span> Songs</p>
                    </div>
                    <div className="section-playlist-post-body">
                        <div className="card-grid">
                            {songs.map((song) => (
                                <div className="card-simple" key={song.songId}>
                                    <Link to={`/songs/${song.songId}/play`}>
                                        <figure>
                                            <img src={song.coverImage} alt={song.songTitle} />
                                        </figure>
                                        <h3>{song.songTitle}</h3>
                                    </Link>
                                    <p>
                                        Likes: {song.likes}, Downloads: {song.downloads}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Artist;