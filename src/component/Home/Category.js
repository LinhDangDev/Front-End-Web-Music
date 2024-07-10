import React from 'react';

const Category = () => {
    return (
        <section className="section-category" id="category">
            <div>
                <h2>Category</h2>
                <p><a href="#">See all</a></p>
            </div>

            <div className="card-grid-slider">
                {categoryData.map((group, groupIndex) => (
                    <div className="card-group-grid" key={groupIndex}>
                        {group.map((category) => (
                            <a href="#" key={category.id}>
                                <div className={`card-category-vertical ${category.className}`}>
                                    <h4>{category.name}</h4>
                                    <span className="far fa-play"></span>
                                </div>
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

// Sample category data - Replace with your actual data
const categoryData = [
    [
        { id: 1, name: 'Soundtrack', className: 'card-category-vertical-soft-1' },
        { id: 2, name: 'Epic', className: 'card-category-vertical-soft-2' }
    ],
    [
        { id: 3, name: 'Orchestral', className: 'card-category-vertical-soft-3' },
        { id: 4, name: 'Rock', className: 'card-category-vertical-soft-4' }
    ],
    // Add more category groups here
];

export default Category;