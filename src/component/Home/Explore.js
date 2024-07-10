import React from "react";
import SongService from "../../services/SongService";
import { Link } from "react-router-dom";
var SONGS, TOP_SONGS, NEW_SONG, TOP_DOWNS;
class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
    };
  }
  componentDidMount() {
    SongService.getAll()
      .then((res) => {
        SONGS = res.result;
        createSort(SONGS);
        this.setState({ songs: NEW_SONG });
      })
      .catch((err) => {
        console.error("Get songs failed: " + err);
      });
  }
  handleNewSong = () => {
    this.setState({ songs: NEW_SONG });
  };
  handleTopSong = () => {
    this.setState({ songs: TOP_SONGS });
  };
  handleTopDowns = () => {
    this.setState({ songs: TOP_DOWNS });
  };

  render() {
    return (
      <section className="section-explore" id="explore">
        {/* <!-- EXPLORE MENU --> */}
        <div className="section-explore-menu">
          <Link
            to=""
            onClick={this.handleNewSong}
            className="section-explore-menu-item-active"
          >
            Newest Songs
          </Link>
          <Link
            to=""
            onClick={this.handleTopSong}
            className="section-explore-menu-item"
          >
            Top Songs
          </Link>
          <Link
            to=""
            onClick={this.handleTopDowns}
            className="section-explore-menu-item"
          >
            Top Downloads
          </Link>
        </div>

        {/* <!-- EXPLORE SLIDER --> */}
        <div className="card-grid-slider">
          {this.state.songs.map((item, index) => (
            <div className="card-simple" key={item.songId}>
              <Link
                to={{
                  pathname: `/songs/${item.songId}/play`,
                  state: { song: { item }, relatedMusic: { SONGS } },
                }}
              >
                <figure>
                  <img
                    src={`http://localhost:8080/img/${item.coverImage}`}
                    alt={item.songTitle}
                  />
                </figure>
                <h3>{item.songTitle}</h3>
              </Link>
              <p>
                <p>{item.artistSongs[0].artist.artistName}</p>
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

function createSort(arrSongs) {
  TOP_SONGS = arrSongs.sort((a, b) => b.likes - a.likes).slice(0, 6);
  NEW_SONG = arrSongs.sort((a, b) => b.releaseDate - a.releaseDate).slice(0, 6);
  TOP_DOWNS = arrSongs.sort((a, b) => b.downloads - a.downloads).slice(0, 6);
}

// Sample music data - replace with your actual data

export default Explore;
