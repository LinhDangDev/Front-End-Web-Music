import React from 'react';
import { Link } from 'react-router-dom';
const ArtistsHeader = ({ artist }) => {

const download = () => {
// Xử lý sự kiện click nút "Following" ở đây
console.log("Following button clicked!");
};

return (
<header className="hero hero-page">
    <div>
    <figure>
        <Link to={`/artist/${artist.id}`}> {/* Sử dụng Link để điều hướng */}
        <img src={artist.avatar} alt={artist.name} />
        </Link>
    </figure>
    <div>
        <h1>{artist.name}</h1>
        <div>
        <button
            className="btn-post-default"
            style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
            title="Following"
            aria-label="Following"
        >
            Following
        </button>
        </div>
    </div>
    </div>
</header>
);
};

export default ArtistsHeader;