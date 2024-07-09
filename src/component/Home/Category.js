import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GenreService from '../../services/GenreService';

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GenreService.getAll();
        // Assuming the response has a structure like { code: 1000, result: [...] }
        if (response.code === 1000) {
          // Format the data as needed
          const formattedData = response.result.map((genre) => ({
            id: genre.genreId,
            name: genre.genreName,
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

  return (
    <section className="section-category" id="category">
      <div>
        <h2>Category</h2>
        <p>
          <Link to="#">See all</Link>
        </p>
      </div>

      <div className="card-grid-slider">
        {categoryData.map((category, index) => (
          <div className="card-group-grid" key={index}>
            <Link to={`/category/${category.id}`} key={category.id}>
              <div className={`card-category-vertical ${category.className}`}>
                <h4>{category.name}</h4>
                <span className="far fa-play"></span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;