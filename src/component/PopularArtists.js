import React from 'react';

const PopularArtists = () => {
return (
<section className="section-popular-artists" id="popular_artists">
    <div>
    <h2>Popular Artists</h2>
    <p><a href="#">See all</a></p>
    </div>

    <div className="card-grid-slider">
    {artistData.map((artist) => (
        <a href="user.html" key={artist.id}>
        <div className="card-artists-vertical">
            <figure>
            <img src={artist.imageUrl} alt={artist.name} />
            </figure>
            <h4>{artist.name}</h4>
        </div>
        </a>
    ))}
    </div>
</section>
);
};

// Sample artist data - Replace with your actual data
const artistData = [
{
    id: 1,
    name: 'Hans Zimmer',
    imageUrl: 'images/avatar-artists/Hans-Zimmer-400x400.jpg'
},
{
    id: 2,
    name: 'Henry Jackman',
    imageUrl: 'images/avatar-artists/Henry-Jackman-400x400.jpg'
},
  // Add more artist data here
];

export default PopularArtists;