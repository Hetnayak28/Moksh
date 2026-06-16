import React, { useState } from 'react';
import { getProductImage } from '../imageHelper';

const AllProducts = ({ products = [], handleAddToCart, onOpenQuickView, searchQuery }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('default');


    const getProductCategory = (prod) => {
        const name = prod.name.toLowerCase();
        if (name.includes('combination kit')) return 'Combo Kit';
        if (name.includes('pyramid')) return 'Pyramid';
        if (name.includes('bracelet')) return 'Bracelet';
        if (name.includes('pencil')) return 'Pencil';
        return 'Bracelet';
    };

    const getItemPrice = (price) => {
        if (!price || price.toString().trim() === "") return 500;
        const num = parseFloat(price.toString().replace(/[₹\s,]/g, ''));
        return isNaN(num) ? 500 : num;
    };

    // Filter logic
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || getProductCategory(product) === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Sorting logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-asc') {
            return getItemPrice(a.price) - getItemPrice(b.price);
        }
        if (sortBy === 'price-desc') {
            return getItemPrice(b.price) - getItemPrice(a.price);
        }
        if (sortBy === 'name-asc') {
            return a.name.localeCompare(b.name);
        }
        return 0; // default order
    });

    const formatPrice = (price) => {
        if (!price || price.toString().trim() === "") return '₹ 500';
        const str = price.toString().trim();
        if (str.startsWith('₹')) return str;
        return `₹ ${str}`;
    };

    const categories = ['All', 'Bracelet', 'Pyramid', 'Pencil', 'Combo Kit'];

    return (
        <section className="all-products">
            <div className="container">
                <h2>All Products</h2>
                
                {/* Filters and Sorting Control Panel */}
                <div className="catalog-control-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px', background: 'var(--color-bg-base)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                        
                        {/* Category selection */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-muted)', marginRight: '8px' }}>Category:</span>
                            {categories.map((cat, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'var(--transition-fast)',
                                        backgroundColor: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                                        color: selectedCategory === cat ? 'white' : 'var(--color-text-main)',
                                        boxShadow: selectedCategory === cat ? 'var(--shadow-sm)' : 'none',
                                        border: selectedCategory === cat ? '1px solid transparent' : '1px solid var(--color-border)'
                                    }}
                                >
                                    {cat}s
                                </button>
                            ))}
                        </div>
                        
                        {/* Sorting Dropdown */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <label htmlFor="sortBy" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-muted)' }}>Sort By:</label>
                            <select 
                                id="sortBy" 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    padding: '10px 16px',
                                    borderRadius: 'var(--radius-full)',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    background: 'var(--color-bg-surface)',
                                    color: 'var(--color-text-main)',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                <option value="default">Default Match</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name-asc">Name: A to Z</option>
                            </select>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: '500' }}>
                        <span>Showing {sortedProducts.length} products</span>
                        {searchQuery && <span>Search results for "{searchQuery}"</span>}
                    </div>
                </div>

                <div className="product-grid">
                    {sortedProducts.map((product, index) => {
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
                
                {sortedProducts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '64px 0' }}>
                        <i className="fa-solid fa-box-open" style={{ fontSize: '48px', color: 'var(--color-primary)', marginBottom: '16px' }}></i>
                        <p style={{ fontSize: '18px', fontWeight: '600' }}>No products found.</p>
                        <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>Try resetting your category filters or typing a different search term.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllProducts;
