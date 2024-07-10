import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GenreService from '../../services/GenreService';
import Footer from './Footer';
import HeaderHero from './HeaderHero';
import Loader from './Loader';
import NavBar from './NavBar';
import SearchMode from './SearchMode';
import SupportChatMode from './SupportChatMode';

const CategoryPageSong = () => {
  const { genreId } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GenreService.getSongsByGenreId(genreId);

        if (response.code === 1000) {
          setSongs(response.result);
          setLoading(false);
        } else {
          setError('Failed to fetch songs for this category.');
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
        setError('An error occurred while fetching songs.');
      }
    };

    fetchData();
  }, [genreId]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSongClick = (song) => {
    setCurrentSong(song);
  };
  
  return (
    <div>
      <NavBar />
      <SupportChatMode />
      <SearchMode />
      <main class="user-page">
        <section className="section-playlist-post">
          {/* <div className="container"> */}
            <div className="section-playlist-post-header">
              <h2>{genreId}</h2> 
              <p>Number: <span>{songs.length}</span> Songs</p>
            </div>
            <div className="section-playlist-post-body">
            <div className="card-grid" id="cardGridLen">
                  {songs.map((song) => (
                    <div 
                      className="card-simple" 
                      key={song.id} 
                      onClick={() => handleSongClick(song)}
                    >
                      <Link to={`/songs/${song.id}/play`}> {/* Nếu muốn chuyển hướng sang trang Song */}
                        <figure>
                          <img src={song.imageUrl} alt={song.name} />
                        </figure>
                        <h3>{song.name}</h3>
                      </Link>
                    </div>
                  ))}
                </div>
            {/* </div> */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CategoryPageSong;