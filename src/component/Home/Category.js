import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GenreService from "../../services/GenreService";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GenreService.getAll();
        if (response.code === 1000) {
          setCategoryData(response.result);
        } else {
          console.error("Failed to fetch categories:", response.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="section-category" id="category">
      <div>
        <h2>Category</h2>
        <p>
          <Link to="/all-categories">See all</Link>
        </p>
      </div>

      <div className="card-grid-slider">
        {categoryData.map((category) => (
          <div className="card-group-grid" key={category.genreId}>
            <Link to={`/genres/${category.genreId}/songs`}>
              <div
                className={`card-category-vertical card-category-vertical-soft-${category.genreId}`}
              >
                <h4>{category.genreName}</h4>
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
