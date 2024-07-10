import React from 'react';
import { Link } from 'react-router-dom';

const GenreHeader = ({ genre }) => {
    const Favorite = () => {
        // Xử lý sự kiện click nút "Favorite" ở đây
        console.log("Favorite button clicked.");
        if (genre.isFavorite) {
            return "Unfavorite";
        } else {    
            return "Favorite";
        }
    };

    return (
        <header className="hero hero-page">
            <div>
                <figure>
                    <Link to={`/artist/${genre.id}`}> {/* Sử dụng Link để điều hướng */}
                        <img src={genre.avatar} alt={genre.name} />
                    </Link>
                </figure>
                <div>
                    <h1>{genre.name}</h1>
                    <h3>{genre.description}</h3>
                    <div>
                        <button
                            className="btn-post-default"
                            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
                            title="Favorite"
                            aria-label="Favorite"
                        >
                            Favorite
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default GenreHeader;