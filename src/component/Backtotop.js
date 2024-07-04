import React, { useEffect } from 'react';

export default function Backtotop() {
    useEffect(() => {
        const backTop = document.getElementById("backTop");
        const navbarFixed = document.getElementById("navbarFixed");

        const handleScroll = () => {
            if (window.scrollY > 200) {
                backTop.classList.add("back-top-active");
            } else if (window.scrollY > 50) {
                navbarFixed.classList.add("nav-fixed-active");
            } else {
                backTop.classList.remove("back-top-active");
                navbarFixed.classList.remove("nav-fixed-active");
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <a href="#Top">
            <div className="back-top" id="backTop">
                <span className="far fa-angle-up"></span>
            </div>
        </a>
    );
}
