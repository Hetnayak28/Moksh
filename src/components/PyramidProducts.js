import React from 'react';
import pyramidImage1 from '../assets/images/pyramid 1.jpg';
import pyramidImage2 from '../assets/images/pyramid 2.jpg';

const PyramidProducts = ({ handleAddToCart, onOpenQuickView }) => {
    const products = [
        { name: "Pyramid Product 1", price: "500.00", image: pyramidImage1, description: "This is the first pyramid product." },
        { name: "Pyramid Product 2", price: "500.00", image: pyramidImage2, description: "This is the second pyramid product." },
    ];

    const formatPrice = (price) => {
        if (!price || price.toString().trim() === "") return '₹ 500.00';
        const str = price.toString().trim();
        if (str.startsWith('₹')) return str;
        return `₹ ${str}`;
    };

    return (
        <section className="pyramid-products">
            <div className="container">
                <h2>Pyramid Products</h2>
                <div className="product-grid">
                    {products.map((product, index) => (
                        <div className="product-card" key={index}>
                            <div 
                                style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                                onClick={() => onOpenQuickView(product)}
                            >
                                <img src={product.image} alt={product.name} />
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
                    ))}
                </div>
                {products.length === 0 && <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No pyramid products found.</p>}
            </div>
        </section>
    );
};

export default PyramidProducts;
