import React from 'react';


const AlbumHeader = ({ album }) => {
    if (!album) {
        return null;
    }

    return (
        <section className="section-header-hero"  style={{ textAlign: 'center' }}>
            <div className="container">
                <div className="section-header-hero-body">
                    <div className="section-header-hero-image">
                        <img src={`http://localhost:8080/img/${album.coverImage}`} alt={album.albumName} />
                    </div>
                    <div className="section-header-hero-info">
                        <h1>{album.albumName}</h1>
                        <p>{album.artist.artistName}</p>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AlbumHeader;