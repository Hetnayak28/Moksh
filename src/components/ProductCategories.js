import React from 'react';
import { Link } from 'react-router-dom';
import allProductsImage from '../assets/images/pyramid 1.jpg';
import pyramidImage from '../assets/images/pyramid 2.jpg';
import braceletImage from '../assets/images/bracelet 1.jpg';
import pencilImage from '../assets/images/pencile 1.jpg';

const ProductCategories = () => {
    const productTypes = [
        { name: "All Products", path: "/products/all", image: allProductsImage },
        { name: "Pyramids", path: "/products/pyramid", image: pyramidImage },
        { name: "Bracelets", path: "/products/bracelet", image: braceletImage },
        { name: "Pencils", path: "/products/pencil", image: pencilImage }
    ];

    return (
        <section className="product-categories">
            <div className="container">
                <div className="category-group">
                    <h5>Product Categories</h5>
                    <div className="category-grid">
                        {productTypes.map((item, index) => (
                            <Link to={item.path} key={index} className="category-card">
                                <img src={item.image} alt={item.name} />
                                <h6>{item.name}</h6>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductCategories;
