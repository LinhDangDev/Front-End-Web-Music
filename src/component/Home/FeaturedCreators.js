import React from 'react';
import { Link } from 'react-router-dom';
const FeaturedCreators = () => {
    return (
        <section className="section-featured-creators" id="featured_creators">
            <div>
                <h2>Featured Creators</h2>
                <p>  <Link to="#">See all</Link></p>
            </div>

            <div className="card-grid-slider">
                {creatorData.map((group, groupIndex) => (
                <div className="card-group-grid" key={groupIndex}>
                    {group.map((creator) => (
                    <div className="card-simple" key={creator.id}>
                        <Link to={`/artist/${creator.id}`}> 
                        <figure>
                            <img src={creator.imageUrl} alt={creator.name} />
                        </figure>
                        <h3>{creator.name}</h3>
                        </Link>
                        <p>
                        <Link to={`/artist/${creator.artistId}`}> 
                            {creator.artist}
                        </Link>
                        </p>
                    </div>
                    ))}
                </div>
                ))}
            </div>
        </section>
    );
};

// Sample creator data - replace with your actual data
const creatorData = [
    [
        {
            id: 1,
            name: 'Acceleration',
            artist: 'Amadea Music Productions',
            artistId: 1, 
            imageUrl: 'images/covers/Acceleration-Amadea-Music-Productions-400x400.jpeg'
        },
        {
            id: 2,
            name: 'Charged',
            artist: 'Charged',
            artistId: 2, 
            imageUrl: 'images/covers/Charged-400x400.jpg'
        }
    ],
    [
        {
            id: 3,
            name: 'Deflector 3',
            artist: 'Complexities of Sound',
            imageUrl: 'images/covers/Deflector-3-Complexities-of-Sound-400x400.jpeg'
        },
        {
            id: 4,
            name: 'Divergent',
            artist: 'Hybrid Orchestra',
            imageUrl: 'images/covers/Divergent-Hybrid-Orchestra-Political-Drama-Themes-Lucas-Napoleone-Philippe-Briand-Salvador-Casais-400x400.jpeg'
        }
    ],
    // Add more creator groups here...
];

export default FeaturedCreators;