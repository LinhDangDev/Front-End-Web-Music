import React from 'react';


export default function SearchMode(){
    return (
        // <!-- SEARCH MODE -->
        <div class="overlay-search-mode" id="overlaySearchMode">
        <div class="search-mode" id="searchMode">
            <a href="javascript:void(0)" onclick="searchMode()"></a>
            {/* <!-- FORM: SEARCH --> */}
            <form action="" method="post">
                <span class="far fa-search"></span>
                <input type="search" placeholder="Search" aria-placeholder="Search"/>
            </form>
        </div>
    </div>
        
    );
}
