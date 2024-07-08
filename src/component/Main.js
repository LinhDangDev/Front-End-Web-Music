import Explore from "./Expplore";
import FeaturedCreators from "./FeaturedCreators"; 
import Trending from "./Trending";
import Category from "./Category";
import PopularArtists from "./PopularArtists";
export default function Main() {
    return (
                // <!-- MAIN -->
                <main>

                {/* <!-- #SECTION: EXPLORE --> */}
                <Explore />

                {/* <!-- #SECTION: FEATURED CREATORS --> */}
                <FeaturedCreators/>
    
                {/* <!-- #SECTION: TRENDING --> */}
                <Trending/>

    
                {/* <!-- #SECTION: CATEGORY --> */}
                <Category/>
    
                {/* <!-- POPULAR ARTISTS SLIDER --> */}
                
                <PopularArtists/>
            </main>
    );
}