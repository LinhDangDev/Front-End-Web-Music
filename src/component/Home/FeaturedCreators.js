import React from "react";
import { Link } from "react-router-dom";
import AlbumService from "../../services/AlbumService";
import ArtistSongService from "../../services/ArtistSongService";

var ALBUMS, DISPLAY_ALBUMS;
var ARTIST_SONGS;
class FeaturedCreators extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      display_albums: [],
    };
  }
  componentDidMount() {
    ArtistSongService.getAll().then((res) => {
      ARTIST_SONGS = res.result;
    });

    AlbumService.getAll()
      .then((res) => {
        // sort from newest to oldest
        DISPLAY_ALBUMS = ALBUMS = res.result.sort(
          (a, b) => Date(b.releaseDate) - Date(a.releaseDate)
        );

        //add artist properties
        DISPLAY_ALBUMS = ALBUMS = addArtistIntoAlbums(ARTIST_SONGS, ALBUMS);

        // split groub 2
        DISPLAY_ALBUMS = ALBUMS = splitArrayGroup(ALBUMS);

        // slice it to 8 (4 x 2)
        DISPLAY_ALBUMS = DISPLAY_ALBUMS.slice(0, 4);

        this.setState({ albums: ALBUMS });
        this.setState({ display_albums: DISPLAY_ALBUMS });
      })
      .catch((err) => {
        console.error("Get songs failed: " + err);
      });
  }
  handleSellAll = () => {
    const temp = DISPLAY_ALBUMS;
    DISPLAY_ALBUMS = ALBUMS;
    ALBUMS = temp;
    this.setState({ display_albums: DISPLAY_ALBUMS });
  };
  render() {
    return (
      <section className="section-featured-creators" id="featured_creators">
        <div>
          <h2>Featured Creators Albums</h2>
          <p onClick={this.handleSellAll}>See all</p>
        </div>

        <div className="card-grid-slider">
          {this.state.display_albums.map((group, groupIndex) => (
            <div className="card-group-grid" key={groupIndex}>
              {group.map((item) => (
                <div className="card-simple" key={item.albumId}>
                  <Link to={`/album/${item.albumId}`}>
                    <figure>
                      <img
                        src={`http://localhost:8080/img/${item.coverImage}`}
                        alt={item.albumName}
                      />
                    </figure>
                    <h3>{item.albumName}</h3>
                  </Link>
                  <p>{item.artist.artistName}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }
}

function splitArrayGroup(arrAlbums) {
  let chunkSize = 2; // Kích thước của mỗi mảng con
  let groupedArray = [];
  for (let i = 0; i < arrAlbums.length; i += chunkSize) {
    groupedArray.push(arrAlbums.slice(i, i + chunkSize));
  }
  return groupedArray;
}

function addArtistIntoAlbums(arrArtistSong, arrAlbums) {
  arrAlbums.forEach((album) => {
    arrArtistSong.forEach((item) => {
      if (item.artist.albums[0].albumId === album.albumId) {
        album.artist = item.artist;
      }
    });
  });
  return arrAlbums;
}

// Sample creator data - replace with your actual data
const creatorData = [
  [
    {
      id: 1,
      name: "Acceleration",
      artist: "Amadea Music Productions",
      artistId: 1,
      imageUrl:
        "images/covers/Acceleration-Amadea-Music-Productions-400x400.jpeg",
    },
    {
      id: 2,
      name: "Charged",
      artist: "Charged",
      artistId: 2,
      imageUrl: "images/covers/Charged-400x400.jpg",
    },
  ],
  [
    {
      id: 3,
      name: "Deflector 3",
      artist: "Complexities of Sound",
      imageUrl: "images/covers/Deflector-3-Complexities-of-Sound-400x400.jpeg",
    },
    {
      id: 4,
      name: "Divergent",
      artist: "Hybrid Orchestra",
      imageUrl:
        "images/covers/Divergent-Hybrid-Orchestra-Political-Drama-Themes-Lucas-Napoleone-Philippe-Briand-Salvador-Casais-400x400.jpeg",
    },
  ],
  // Add more creator groups here...
];

export default FeaturedCreators;
