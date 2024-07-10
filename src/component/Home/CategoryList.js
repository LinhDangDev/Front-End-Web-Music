import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Loader from './Loader';
import NavBar from './NavBar';
import SearchMode from './SearchMode';
import SupportChatMode from './SupportChatMode';
import GenreService from '../../services/GenreService';


const AllCategory = () => {
    const [categoryData, setCategoryData] = useState([]);
    const cardGridRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GenreService.getAll();
                if (response.code === 1000) {
                    const formattedData = response.result.map((genre) => ({
                        id: genre.genreId,
                        name: genre.genreName,
                        description: genre.description,
                        className: `card-category-vertical-soft-${genre.genreId}`,
                    }));
                    setCategoryData(formattedData);
                } else {
                    console.error('Failed to fetch categories:', response.message);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
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
        <div className="app-container"> {/* Wrap everything in a main container */}
            <NavBar /> 
            <SupportChatMode />
            <SearchMode />

            <main className="main-container">
                <Loader />
                <section className="section-category" id="category">
                    <div className='container'>
                        <div className="section-category-header">
                            {/* Divide the header into three columns */}
                            <div className="header-column"></div> {/* Empty column for left spacing */}
                            <div className="header-column">
                                <h1>All Category</h1> 
                            </div>
                            <div className="header-column"></div> {/* Empty column for right spacing */}
                        </div>
                        <div 
                            className="card-grid-slider" 
                            ref={cardGridRef}
                            onMouseMove={handleMouseMove}
                        >
                            {categoryData.map((category, index) => (
                                // Wrap each pair of categories in a row div
                                index % 2 === 0 ? (
                                    <div className="card-group-grid" key={index}>
                                        <Link to={`/genres/${category.genreId}/songs`}>
                                            <div className={`card-category-vertical ${category.className}`}>
                                                <div className='card-body'>
                                                    <h4>{category.name}</h4>
                                                    <p>{category.description}</p>
                                                </div>
                                                <span className="far fa-play"></span>
                                            </div>
                                        </Link>
                                        {categoryData[index + 1] && ( 
                                            <Link to={`/genres/${categoryData[index + 1].id}/s`} key={categoryData[index + 1].id}>
                                                <div className={`card-category-vertical ${categoryData[index + 1].className}`}>
                                                    <div className='card-body'>
                                                        <h4>{categoryData[index + 1].name}</h4>
                                                        <p>{categoryData[index + 1].description}</p>
                                                    </div>
                                                    <span className="far fa-play"></span>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AllCategory;