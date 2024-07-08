
const Explore = () => {
    return (
        <section className="section-explore" id="explore">
            {/* <!-- EXPLORE MENU --> */}
            <div className="section-explore-menu">
                <a href="#top-musics" className="section-explore-menu-item-active">Top Musics</a>
                <a href="#recently-played">Recently Played</a>
                <a href="#new-musics">New Musics</a>
                <a href="#bestsellers">Bestsellers</a>
            </div>

            {/* <!-- EXPLORE SLIDER --> */}
            <div className="card-grid-slider">
                <div className="card-grid-slider">
                    {musicData.map((music) => (
                        <div className="card-simple" key={music.id}>
                            <a href="post.html">
                                <figure>
                                    <img src={music.imageUrl} alt={music.title} />
                                </figure>
                                <h3>{music.title}</h3>
                            </a>
                            <p><a href="user.html">{music.artist}</a></p>
                        </div>
                    ))}
                </div>
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
        imageUrl: 'images/covers/Acceleration-Amadea-Music-Productions-400x400.jpeg'
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