import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ArtistService from '../../services/ArtistService'; 
import Footer from './Footer';
import Loader from './Loader';
import NavBar from './NavBar';
import SearchMode from './SearchMode';
import SupportChatMode from './SupportChatMode';
import './Artists.css'; 

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

        // Fetch artist details
        const artistResponse = await ArtistService.getArtist(artistId);
        if (artistResponse.code === 1000 && artistResponse.result) { 
          setArtist(artistResponse.result);
        } else {
          setError('Artist not found or an error occurred.'); 
        }

        // Fetch songs by the artist
        const songsResponse = await ArtistService.getSongsByArtist(artistId);
        if (songsResponse.code === 1000) { 
          setSongs(songsResponse.result);
        } else {
          setError('Failed to fetch songs for this artist.');
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching artist data.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchArtistData();
  }, [artistId]); // Run effect when artistId changes

  if (loading) {
    return <Loader loading={loading} />; // Show loader while fetching data
  }

  if (error) {
    return (
      <div className="app-container"> 
        <NavBar /> 
        <SupportChatMode />
        <SearchMode />
        <main className="user-page"> 
          <div className="artist-container"> 
            <div>Error: {error}</div> 
          </div>
        </main>
        <Footer /> 
      </div>
    );
  }

  return (
    <div className="app-container">
      <NavBar />
      <SupportChatMode />
      <SearchMode />
      <main className="user-page"> 
        <div className="artist-container">
          {artist && ( 
            <div className="artist-header" style={{ textAlign: 'center' }}>
              <img
                src={`http://localhost:8080/img/${artist.avatar}`}
                alt={artist.artistName}
                className="artist-avatar"
              />
              <h1 className="artist-name">{artist.artistName}</h1>
              {/* Add more artist details as needed (bio, etc.) */}
            </div>
          )}

          <section className="section-playlist-post">
            <div className="section-playlist-post-header">
              <h2>Songs</h2>
            </div>
            <div className="section-playlist-post-body">
              <div className="card-grid"> {/* Consider making this responsive */}
                {songs.map((song) => (
                  <div className="card-simple" key={song.songId}>
                    <Link to={`/songs/${song.songId}/play`}> {/* Link to Song page */}
                      <div className="song-card">
                        <figure className="song-image">
                          <img
                            src={`http://localhost:8080/img/${song.coverImage}`} 
                            alt={song.songTitle}
                          />
                        </figure>
                        <div className="song-info">
                          <h3>{song.songTitle}</h3>
                        </div>
                      </div>
                    </Link>
                    <p>
                      {/* Add like/download functionality if needed */}
                      Likes: {song.likes}, Downloads: {song.downloads} 
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Artist;