import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArtistService from '../../services/ArtistService';

const PopularArtists = () => {
  const [artistData, setArtistData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ArtistService.getCustomInformation(); // Call getCustomInformation
        if (response.code === 1000) {
          setArtistData(response.result); // Directly set the data 
        } else {
          console.error('Failed to fetch artists:', response.message);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="section-popular-artists" id="popular_artists">
      <div>
        <h2>Popular Artists</h2>
        <p> <Link to="#">See all</Link></p>
      </div>

      <div className="card-grid-slider">
        {artistData.map((artist) => (
          <Link to={`/artist/${artist.id}`} key={artist.id}> 
            <div className="card-artists-vertical">
              <figure>
                <img src={artist.imageUrl} alt={artist.name} /> {/* Use artist.imageUrl */}
              </figure>
              <h4>{artist.name}</h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularArtists;