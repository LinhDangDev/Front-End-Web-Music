export default function HeaderHero() {
    return (
        // <!-- HEADER/HERO -->
        <header className="hero">
            {/* <!-- TITLE HEADER --> */}
            <h1>An unparalleled experience of <br /> sound magic, Inspired Melody</h1>

            {/* <!-- FORM: SEARCH --> */}
            <form action="" method="post">
                <span className="far fa-search"></span>
                <input type="search" placeholder="Search for music" aria-placeholder="Search for music" />
            </form>

            {/* <!-- IMAGE SUORCE --> */}
            <p>Free image by <a href="https://pixabay.com/photos/concert-microphone-bandstand-music-7424190/">HubertPhotographer</a></p>
        </header>
    );
}