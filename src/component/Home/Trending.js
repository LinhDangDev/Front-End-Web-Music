import React from 'react';
import { Link } from 'react-router-dom';
const Trending = () => {
    return (
        <section className="section-trending" id="trending">
            <div>
                <h2>Trending</h2>
                <p> <Link to="#">See all</Link></p>
            </div>

            <div className="card-grid-slider">
                {trendingData.map((group, groupIndex) => (
                <div className="card-group-grid" key={groupIndex}>
                    {group.map((track) => (
                    <div className="card-playing-horizontal" key={track.id}>
                        <figure className="card-playing-horizontal-header">
                        <div>
                            <span
                            className="far fa-play"
                            onClick={() => console.log('Play:', track.title)}
                            ></span>
                        </div>
                        <Link to={`/song/${track.id}`}>
                            <img src={track.imageUrl} alt={track.title} />
                        </Link>
                        </figure>
                        <div className="card-playing-horizontal-body">
                        <h4>
                            <Link to={`/song/${track.id}`}>{track.title}</Link>
                        </h4>
                        <p>
                            <Link to={`/artist/${track.artistId}`}>
                            {track.artist}
                            </Link>
                        </p>
                        </div>
                        <div className="card-playing-horizontal-footer">
                        <a
                            href="#"
                            onClick={() => console.log('Like:', track.title)}
                            title="Like"
                            aria-label="Like"
                        >
                            <span className="far fa-heart"></span>
                        </a>
                        <a
                            href="#"
                            onClick={() => console.log('Download:', track.title)}
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

// Sample trending data - Replace with your actual data
const trendingData = [
    [
        {
            id: 1,
            title: 'Undefeated',
            artist: 'Amadea Music Productions',
            artistId: 1, 
            imageUrl: 'images/covers/Undefeated-Amadea-Music-Productions-400x400.jpeg'
        },
        {
            id: 2,
            title: 'John Wick Chapter 3 Parabellum',
            artist: 'Tyler Bates',
            artistId: 2, 
            imageUrl: 'images/covers/Tyler-Bates-John-Wick-Chapter-3-Parabellum-400x400.jpg'
        },
        {
            id: 3,
            title: '1917',
            artist: 'Thomas Newman',
            artistId: 3, 
            imageUrl: 'images/covers/Thomas-Newman-1917-400x400.jpg'
        }
        // Add more tracks here
    ],
    // Add more groups of trending tracks here
];

export default Trending;