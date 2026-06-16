import React from 'react';
import { Link } from 'react-router-dom';
import { getProductImage } from '../imageHelper';

const RecommendedProducts = ({ products = [], handleAddToCart, onOpenQuickView }) => {
    // Select a subset of products to show (e.g. first 12 or 14 items)
    const recommendedList = products && products.length > 0 ? products.slice(0, 14) : [];

    const formatPrice = (price) => {
        if (!price || price.toString().trim() === "") return '₹ 500';
        const str = price.toString().trim();
        if (str.startsWith('₹')) return str;
        return `₹ ${str}`;
    };

    return (
        <section className="recommended-products">
            <div className="container">
                <h3>Recommended Products</h3>
                <div className="product-grid">
                    {recommendedList.map((product, index) => {
                        const productImage = product.image_name ? getProductImage(product.image_name) : product.image;
                        return (
                            <div className="product-card" key={index}>
                                <div 
                                    style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                                    onClick={() => onOpenQuickView(product)}
                                >
                                    <img src={productImage} alt={product.name} />
                                    <div className="product-card-image-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(124, 58, 237, 0.08)', opacity: 0, transition: 'var(--transition-normal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-primary)', fontWeight: '700', fontSize: '12px', padding: '8px 16px', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-sm)' }}>
                                            <i className="fa-solid fa-eye" style={{ marginRight: '6px' }}></i> Quick View
                                        </span>
                                    </div>
                                </div>
                                <h6 onClick={() => onOpenQuickView(product)} style={{ cursor: 'pointer' }}>{product.name}</h6>
                                <p className="description">{product.description}</p>
                                <p className="price">{formatPrice(product.price)}</p>
                                <button onClick={() => handleAddToCart(product)}>
                                    <i className="fa-solid fa-cart-plus"></i> Add to Cart
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="see-all-container">
                    <Link to="/products/all" className="see-all-btn">
                        See All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RecommendedProducts;

