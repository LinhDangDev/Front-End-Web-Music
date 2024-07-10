import React from "react";
// In your target JavaScript file (e.g., script.js)
// import './public/js/app.js';
const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <ul>
          <div>
            <img
              src="/images/logo/SVG/Audiospark_Logo_Icon.svg"
              alt=""
              width="75px"
              id="logoFooterModeLight"
            />
            <img
              src="images/logo/SVG/Audiospark_Logo_White.svg"
              alt=""
              width="75px"
              id="logoFooterModeDark"
            />

            {/* SOCIAL MEDIA */}
            <ul className="footer-social-media">
              <a href="https://github.com/Mhadi-1382/" title="Github">
                <span className="fab fa-github"></span>
              </a>
              <a href="https://dribbble.com/Mahdi_Rabiee/" title="Dribbble">
                <span className="fab fa-dribbble"></span>
              </a>
              <a
                href="https://www.pinterest.com/MahdiRabiee82/"
                title="Pinterest"
              >
                <span className="fab fa-pinterest"></span>
              </a>
            </ul>

            {/* FOOTER ICON */}
            <ul className="footer-icon">
              <a href="">
                <img
                  src="images/elements/apple_download.svg"
                  alt=""
                  width="100"
                />
              </a>
              <a href="">
                <img
                  src="images/elements/google_download.svg"
                  alt=""
                  width="100"
                />
              </a>
            </ul>
          </div>
        </ul>
        <ul>
          <h4>Audiospark</h4>
          <li>
            <a href="#explore">Explore</a>
          </li>
          <li>
            <a href="#featured_creators">Featured Creators</a>
          </li>
          <li>
            <a href="#trending">Trending</a>
          </li>
          <li>
            <a href="#category">Category</a>
          </li>
          <li>
            <a href="#popular_artists">Popular Artists</a>
          </li>
        </ul>
        <ul>
          <h4>Company</h4>
          <li>
            <a href="">About</a>
          </li>
          <li>
            {/* <a href="#support" onClick={() => supportChatMode()}>Support</a> */}
          </li>
          <li>
            <a href="">API</a>
          </li>
          <li>
            <a href="">Terms of Service</a>
          </li>
          <li>
            <a href="">Privacy Policy</a>
          </li>
          <li>
            <a href="">Cookie Policy</a>
          </li>
        </ul>
        <ul>
          <h4>Community</h4>
          <li>
            <a href="">Blog</a>
          </li>
          <li>
            <a href="">Forum</a>
          </li>
        </ul>
      </div>

      {/* FOOTER COPYRIGHT */}
      <div className="footer-copyright">
        <p>© 2024 Insprited Melody. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
