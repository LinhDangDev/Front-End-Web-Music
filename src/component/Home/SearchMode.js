import React from 'react';


export default function SearchMode() {
    return (
        // <!-- SEARCH MODE -->
        <div className="overlay-search-mode" id="overlaySearchMode">
            <div className="search-mode" id="searchMode">
                <a href="javascript:void(0)" onclick="searchMode()"></a>
                {/* <!-- FORM: SEARCH --> */}
                <form action="" method="post">
                    <span className="far fa-search"></span>
                    <input type="search" placeholder="Search" aria-placeholder="Search" />
                </form>
            </div>
        </div>

    );
}
