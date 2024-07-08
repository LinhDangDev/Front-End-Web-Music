import React from 'react';

const Backtotop = () => {
    const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
    };

    return (
    <button onClick={scrollToTop} className="back-top" id="backTop">
        <span className="far fa-angle-up"></span>
    </button>
    );
};

export default Backtotop;