import React from "react";
import { Link } from 'react-router-dom';

const albumsData = [
    {
        id: 1,
        cover: 'images/covers/Acceleration-Amadea-Music-Productions-400x400.jpeg',
        title: 'Acceleration',
        artist: 'Amadea Music Productions',
        artistId: 1, // Giả sử artistId = 1 cho Amadea Music Productions
    },
    // ... (Thêm dữ liệu cho các album còn lại)
];

const Albums = ({ artistId }) => {
    // Lọc albums theo artistId
    const filteredAlbums = artistId ? albumsData.filter(album => album.artistId === artistId) : albumsData;

    return (
        <section className="section-playlist-post">
            <div className="section-playlist-post-header">
                <h2>Albums</h2>
                <p>Hans Zimmer • 2008-2023 • <span id="numAlbums">{filteredAlbums.length}</span> Songs</p>
            </div>
            <div className="section-playlist-post-body">
                <div className="card-grid" id="cardGridLen">
                    {filteredAlbums.map((album) => (
                        <div key={album.id} className="card-simple">
                            <Link to={`/song/${album.id}`}> 
                                <figure>
                                    <img src={album.cover} alt={album.title} />
                                </figure>
                                <h3>{album.title}</h3>
                            </Link>
                            <p>
                                <Link to={`/artist/${album.artistId}`}>
                                    {album.artist}
                                </Link>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Albums;