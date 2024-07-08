import React from "react";
import { Link } from "react-router-dom";
const Explore = () => {
    return (
        <section className="section-explore" id="explore">
            {/* <!-- EXPLORE MENU --> */}
            <div className="section-explore-menu">
                <Link to="#top-musics" className="section-explore-menu-item-active">
                Top Musics
                </Link>
                <Link to="#recently-played" className="section-explore-menu-item">
                Recently Played
                </Link>
                <Link to="#new-musics" className="section-explore-menu-item">
                New Musics
                </Link>
                <Link to="#bestsellers" className="section-explore-menu-item">
                Bestsellers
                </Link>
            </div>

            {/* <!-- EXPLORE SLIDER --> */}
        <div className="card-grid-slider">
        {musicData.map((music) => (
            <div className="card-simple" key={music.id}>
                <Link to={`/song/${music.id}`}>
                <figure>
                    <img src={music.imageUrl} alt={music.title} />
                </figure>
                <h3>{music.title}</h3>
                </Link>
                <p>
                <Link to={`/artist/${music.artistId}`}>{music.artist}</Link>
                </p>
            </div>
            ))}
        </div>
        </section>
    );
};

// Sample music data - replace with your actual data
const musicData = [
    {
        id: 1,
        title: 'Acceleration',
        artist: 'Amadea Music Productions',
        artistId: 1, 
        imageUrl: 'images/covers/Acceleration-Amadea-Music-Productions-400x400.jpeg',
    },
    {
        id: 2,
        title: 'Charged',
        artist: 'Charged',
        imageUrl: 'images/covers/Charged-400x400.jpg'
    },
    // Add more music data here
];

export default Explore;