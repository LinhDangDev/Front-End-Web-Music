import Explore from "./Explore";
import FeaturedCreators from "./FeaturedCreators";
import Trending from "./Trending";
import Category from "./Category";
import PopularArtists from "./PopularArtists";
export default function Main() {
  return (
    // <!-- MAIN -->
    <main>
      {/* //Explore Component */}
      <Explore />

      {/* <!-- #SECTION: FEATURED CREATORS --> */}
      <FeaturedCreators />

      {/* <!-- #SECTION: TRENDING --> */}
      <Trending />

      {/* <!-- #SECTION: CATEGORY --> */}
      <Category />

      {/* <!-- POPULAR ARTISTS SLIDER --> */}

      <PopularArtists />
    </main>
  );
}
