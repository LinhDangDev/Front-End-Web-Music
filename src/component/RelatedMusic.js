import React from 'react';

const RelatedMusic = ({ relatedMusics }) => {
    return (
    <section className="section-trending">
        <div>
        <h2>Related Musics</h2>
        <p>
            <a href="">See all</a>
        </p>
        </div>

        <div className="card-grid-slider">
        {relatedMusics.map((group, groupIndex) => (
            <div key={groupIndex} className="card-group-grid">
            {group.map((music, musicIndex) => (
                <div key={musicIndex} className="card-playing-horizontal">
                <figure className="card-playing-horizontal-header">
                    <div>
                    <span
                        className="far fa-play"
                        onClick={() => {
                        // Xử lý logic khi click nút play
                        console.log('Play button clicked!');
                        }}
                    ></span>
                    </div>
                    <a href="post.html">
                    <img src={music.cover} alt={music.title} />
                    </a>
                </figure>
                <div className="card-playing-horizontal-body">
                    <h4>
                    <a href="post.html">{music.title}</a>
                    </h4>
                    <p>
                    <a href="user.html">{music.artist}</a>
                    </p>
                </div>
                <div className="card-playing-horizontal-footer">
                    <a
                    href="javascript:void(0)"
                    onClick={() => {
                        // Xử lý logic khi click nút like
                        console.log('Like button clicked!');
                    }}
                    title="Like"
                    aria-label="Like"
                    >
                    <span className="far fa-heart"></span>
                    </a>
                    <a
                    href="javascript:void(0)"
                    onClick={() => {
                        // Xử lý logic khi click nút download
                        console.log('Download button clicked!');
                    }}
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

export default RelatedMusic;