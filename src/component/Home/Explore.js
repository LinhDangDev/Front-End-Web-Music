import React from "react";
import SongService from "../../services/SongService"
import { Link } from "react-router-dom";
class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        }
    }
    componentDidMount() {
        SongService.getAll().then((res) => {
            if (res && res.result) { // Check if 'res' and 'res.result' exist
                const filteredSongs = this.filterSongs(res.result); 
                this.setState({ songs: filteredSongs });
            } else {
                console.error("API response doesn't have the expected format:", res);
                // Handle the error gracefully, perhaps by setting a default state or showing an error message
            }
        });
    }
    // Move filtering and sorting logic inside the component
    filterSongs(arrSongs) {
        if (Array.isArray(arrSongs)) { // Check if arrSongs is an array
            //sort songs
            arrSongs.sort((a, b) => b.releaseDate - a.releaseDate);
            // filter songs
            return arrSongs.slice(0, 5); 
        } else {
            console.warn("filterSongs: arrSongs is not an array", arrSongs);
            return []; // Return an empty array to avoid errors in the rendering
        }
    }
    
    render() {
        return (
            <section className="section-explore" id="explore">
                {/* <!-- EXPLORE MENU --> */}
                <div className="section-explore-menu">
                    <Link to="#new-musics" className="section-explore-menu-item-active">
                        Top Musics
                    </Link>
                    <Link to="#recently-played" className="section-explore-menu-item">
                        Recently Played
                    </Link>
                    <Link to="#new-musics" className="section-explore-menu-item">
                        New Musics
                    </Link>
                    <Link to="#bestsellers" className="section-explore-menu-item">
                        Bestsellers
                    </Link>
                </div>

                {/* <!-- EXPLORE SLIDER --> */}
                <div className="card-grid-slider">
                    {this.state.songs.map((item, index) => (
                        <div className="card-simple" key={item.songId}>
                            <Link to={`/song/${item.songId}`}>
                                <figure>
                                    <img src={`http://localhost:8080/src/main/static/img/${item.coverImage}`} alt={item.songTitle} />
                                </figure>
                                <h3>{item.songTitle}</h3>
                            </Link>
                            <p>
                                <Link to={`/artist/${item.artistSongs[0].id}`}>{getArtists(item.artistSongs)}</Link>
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

};


function getArtists(arrArtist) {
    var result = '';
    arrArtist.map((item, index) => {
        result += item.artist.artistName;
    })
    return result;
}

// Sample music data - replace with your actual data
// const musicData = [
//     {
//         id: 1,
//         title: 'Acceleration',
//         artist: 'Amadea Music Productions',
//         artistId: 1,
//         imageUrl: 'images/covers/Acceleration-Amadea-Music-Productions-400x400.jpeg',
//     },
//     {
//         id: 2,
//         title: 'Charged',
//         artist: 'Charged',
//         imageUrl: 'images/covers/Charged-400x400.jpg'
//     },
//     // Add more music data here
// ];

export default Explore;