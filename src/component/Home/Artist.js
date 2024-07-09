import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Albums from './Albums'; // Giả sử bạn có component hiển thị danh sách album
import Loader from './Loader';
import NavBar from './NavBar';
import SupportChatMode from './SupportChatMode';
import SearchMode from './SearchMode';
import HeaderHero from './HeaderHero';
import Footer from './Footer';
import Backtotop from './Backtotop';

const Artist = () => {
    const { artistId } = useParams(); 
    const [artistData, setArtistData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const fetchArtistData = async () => {
        setIsLoading(true);
        try {
        const response = await fetch(`/api/artists/${artistId}`); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArtistData(data);
        } catch (error) {
        console.error('Error fetching data:', error);
        } finally {
        setIsLoading(false);
        }
    };

    fetchArtistData();
    }, [artistId]);

    if (isLoading) {
    return <Loader />;
    }

    if (!artistData) {
    return <div>Không tìm thấy nghệ sĩ.</div>;
    }

    return (
    <div>
        <Loader />
        <NavBar />
        <SupportChatMode />
        <SearchMode />
        <HeaderHero />
        <main className="user-page"> 
        <header className="hero hero-page">
            <div>
            <figure>
                <img src={artistData.imageUrl} alt={artistData.name} />
            </figure>
            <div>
                <h1>{artistData.name}</h1> 
                <div>
                <button type="button" className="btn-post-default">
                    Theo dõi
                </button>
                </div>
            </div>
            </div>
        </header>
        <Albums artistId={parseInt(artistId)} /> 
        </main>
        <Footer />
        <Backtotop />
    </div>
    );
};

export default Artist;