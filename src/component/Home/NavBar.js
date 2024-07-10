import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); // You might want to manage this with your theme context
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);

    // ## NAVBAR MOBILE
    function navbarMobileToggle() {
        document.getElementById("navbarMobileToggle").classList.toggle("navbarMobileToggle");
    }

    // SWITCH MODE
    function switchMode() {
        document.body.classList.toggle("switchMode");
        document.getElementById("switchModeBtnDark").classList.toggle("switchModeBtnDarkToggle");
        document.getElementById("switchModeBtnLight").classList.toggle("switchModeBtnLightToggle");

        document.getElementById("logoFooterModeLight").classList.toggle("logoFooterModeLightToggle");
        document.getElementById("logoFooterModeDark").classList.toggle("logoFooterModeDarkToggle");
    }

    // SEARCH MODE
    function searchMode() {
        document.getElementById("searchMode").classList.toggle("searchMode");
        document.getElementById("overlaySearchMode").classList.toggle("overlaySearchMode");
    }

    // AVATAR DROPDOWN
    function avatarDropdown() {
        document.getElementById("avatarDropdown").classList.toggle("avatarDropdown");
    }

    // SUPPORT & CHAT MODE
    function supportChatMode() {
        document.getElementById("supportChatMode").classList.toggle("supportChatMode");
    }

    return (
        <nav id="navbarFixed">
            <ul>

                <a href="javascript:void(0)" onclick="navbarMobileToggle()" title="Menu" aria-label="Menu" class="fa-bars-mobile"><span class="far fa-bars"></span></a>
                <a href="/"><img src="/images/logo/SVG/Audiospark_Logo_Icon.svg" alt="" width="150px" id="logoFooterModeLight" /></a>

                <ul id="navbarMobileToggle" className={isMobileMenuOpen ? 'open' : ''}> {/* Apply "open" class based on state */}
                    <a href="javascript:void(0)" onClick={navbarMobileToggle} title="Close Menu" aria-label="Close Menu" className="fa-close-mobile">
                        <span className="far fa-close"></span>
                    </a>

                    <li>
                        <a href="http://localhost:3000/#explore">Explore</a>
                    </li>
                    <li>
                        <a href="http://localhost:3000/#featured_creators">Featured Creators</a>
                    </li>
                    <li>
                        <a href="http://localhost:3000/#trending">Trending</a>
                    </li>
                    <li>
                        <a href="http://localhost:3000/#category">Category</a>
                    </li>
                    <li>
                        <a href="http://localhost:3000/#popular_artists">Popular Artists</a>
                    </li>
                </ul>
            </ul>
            <ul>
                <a href="javascript:void(0)" onClick={switchMode} id="switchModeBtnDark" title="Switch Dark Mode" aria-label="Switch Dark Mode" style={{ display: isDarkMode ? 'none' : 'block' }}>
                    <span className="far fa-moon"></span>
                </a>
                <a href="javascript:void(0)" onClick={switchMode} id="switchModeBtnLight" title="Switch Light Mode" aria-label="Switch Light Mode" style={{ display: !isDarkMode ? 'none' : 'block' }}>
                    <span className="far fa-sun"></span>
                </a>
                <a href="javascript:void(0)" onClick={searchMode} title="Search" aria-label="Search">
                    <span className="far fa-search"></span>
                </a>
                <a href="javascript:void(0)" onClick={avatarDropdown}>
                <img src="images/avatar/avatar-1.png" alt="" />
                </a>

                {/* AVATAR DORPDOWN */}
                <div className={`avatar-dropdown ${isAvatarDropdownOpen ? 'open' : ''}`} id="avatarDropdown"> {/* Apply "open" class based on state */}
                    <a href="">
                        <li>
                            <span className="far fa-cog"></span> Settings
                        </li>
                    </a>
                    <a href="javascript:void(0)" onClick={supportChatMode}>
                        <li>
                            <span className="far fa-comment"></span> Support
                        </li>
                    </a>
                    <a href="">
                        <li>
                            <span className="far fa-star"></span> Upgrade Plan
                        </li>
                    </a>
                    <a href="">
                        <li>
                            <span className="far fa-bell"></span> Notification
                        </li>
                    </a>
                    <hr />
                    <a href="">
                        <li>
                            <span className="far fa-history"></span> Recent
                        </li>
                    </a>
                    <a href="">
                        <li>
                            <span className="far fa-heart"></span> likes
                        </li>
                    </a>
                </div>
            </ul>
        </nav>
    );
};

export default NavBar;