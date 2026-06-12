import React from 'react';
import pencilImage1 from '../assets/images/pencile 1.jpg';

const PencilProducts = ({ handleAddToCart, onOpenQuickView }) => {
    const products = [
        { name: "Pencil Product 1", price: "5.00", image: pencilImage1, description: "This is the first pencil product." },
    ];

    const formatPrice = (price) => {
        if (!price || price.toString().trim() === "") return '₹ 5.00';
        const str = price.toString().trim();
        if (str.startsWith('₹')) return str;
        return `₹ ${str}`;
    };

    return (
        <section className="pencil-products">
            <div className="container">
                <h2>Pencil Products</h2>
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
                {products.length === 0 && <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>No pencil products found.</p>}
            </div>
        </section>
    );
};

export default PencilProducts;
