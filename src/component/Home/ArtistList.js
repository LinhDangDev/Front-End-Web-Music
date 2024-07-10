import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Loader from './Loader';
import NavBar from './NavBar';
import SearchMode from './SearchMode';
import SupportChatMode from './SupportChatMode';
import ArtistService from '../../services/ArtistService'; 
import './AllArtist.css'; 

const AllArtist = () => {
    const [artistData, setArtistData] = useState([]);
    const cardGridRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ArtistService.getAll();
                if (response.code === 1000) {
                    const formattedData = response.result.map((artist) => ({
                        id: artist.artistId,
                        name: artist.artistName,
                        avatar: artist.avatar, 
                        className: `card-artist-vertical-soft-${artist.artistId}`,
                    }));
                    setArtistData(formattedData);
                } else {
                    console.error('Failed to fetch artists:', response.message);
                }
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };

        fetchData();
    }, []);

    const handleMouseMove = (e) => {
        const gridContainer = cardGridRef.current;
        const mouseX = e.clientX - gridContainer.getBoundingClientRect().left;
        const containerWidth = gridContainer.offsetWidth;

        // Calculate the scroll position based on mouse position
        const scrollPosition = (mouseX / containerWidth) * (gridContainer.scrollWidth - containerWidth);

        // Smoothly scroll the container
        gridContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    };

    return (
        <div className="app-container">
            <NavBar />
            <SupportChatMode />
            <SearchMode />

            <main className="main-container">
                <Loader />
                <section className="section-artist" id="artist">
                    <div className='container'>
                        <div className="section-artist-header">
                            <div className="header-column">
                                <h1>All Artists</h1>
                            </div>
                        </div>

                        <div 
                            className="card-grid-slider" 
                            ref={cardGridRef}
                        >
                            <div className="card-row">
                                {artistData.slice(0, 4).map((artist, index) => ( 
                                    <Link to={`/artists/${artist.id}`} key={artist.id}>
                                        <div className={`card-artist-vertical ${artist.className}`}>
                                            <img src={`http://localhost:8080/img/${artist.avatar}`} alt={artist.name} className="artist-avatar" />
                                            <div className='card-body'>
                                                <h4>{artist.name}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="card-row">
                                {artistData.slice(4, 8).map((artist, index) => ( 
                                    <Link to={`/artists/${artist.id}`} key={artist.id}>
                                        <div className={`card-artist-vertical ${artist.className}`}>
                                            <img src={`http://localhost:8080/img/${artist.avatar}`} alt={artist.name} className="artist-avatar" />
                                            <div className='card-body'>
                                                <h4>{artist.name}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer /> 
        </div>
    );
};

export default AllArtist;