import React, { useState } from 'react';
import image2 from '../assets/images/bracelet 2.jpg';
import image3 from '../assets/images/bracelet 3.jpg';
import image4 from '../assets/images/bracelet 4.jpg';
import image5 from '../assets/images/bracelet 5.jpg';
import image6 from '../assets/images/bracelet 6.jpg';
import image7 from '../assets/images/bracelet 7.jpg';
import image8 from '../assets/images/bracelet 8.jpg';
import image9 from '../assets/images/pyramid 1.jpg';
import image10 from '../assets/images/pyramid 2.jpg';
import image11 from '../assets/images/bracelet 1.jpg'; 
import image12 from '../assets/images/bracelet 2.jpg'; 
import pyramidImage1 from '../assets/images/pyramid 1.jpg';
import pyramidImage2 from '../assets/images/pyramid 2.jpg';
import braceletImage9 from '../assets/images/bracelet 9.jpg';
import braceletImage10 from '../assets/images/bracelet 10.jpg';
import braceletImage11 from '../assets/images/bracelet 11.jpg';
import braceletImage12_new from '../assets/images/bracelet 12.jpg';
import braceletImage13 from '../assets/images/bracelet 13.jpg';
import pencilImage from '../assets/images/pencile 1.jpg';
import image1 from '../assets/images/bracelet 1.jpg';

const AllProducts = ({ handleAddToCart, onOpenQuickView, searchQuery }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('default');

    const products = [
        { name: "Jet Crystal Combination Kit (SOCIAL MEDIA FAME)", price: "₹ 500", image: image1, description: "This kit helps in achieving social media fame." },
        { name: "Jet Crystal Combination Kit (DEFENSE SECTOR)", price: "₹ 500", image: image2, description: "Boosts defense capabilities and strategic thinking." },
        { name: "Jet Crystal Combination Kit (SERVICE CENTER)", price: "₹ 500", image: image3, description: "Enhances service quality and customer satisfaction." },
        { name: "Jet Crystal Combination Kit (MARRIAGE BUERO)", price: "₹ 500", image: image4, description: "Attracts harmonious relationships and marital bliss." },
        { name: "Jet Crystal Combination Kit (IMPORT/EXPORT)", price: "₹ 500", image: image5, description: "Facilitates smooth international trade and business growth." },
        { name: "Jet Crystal Combination Kit (GROCERY SHOP)", price: "₹ 500", image: image6, description: "Promotes prosperity and abundance in grocery business." },
        { name: "Jet Crystal Combination Kit (MEDICAL SHOP)", price: "₹ 500", image: image7, description: "Supports healing and well-being in medical practices." },
        { name: "Jet Crystal Combination Kit (TEACHING INSTITUTE)", price: "₹ 500", image: image8, description: "Aids in knowledge acquisition and effective teaching." },
        { name: "Jet Crystal Combination Kit (TOUR & TRAVELS)", price: "₹ 500", image: image9, description: "Ensures safe travels and memorable journeys." },
        { name: "Jet Crystal Combination Kit (FOREIGN SETTLEMENT)", price: "₹ 500", image: image10, description: "Helps in smooth transition and settlement in foreign lands." },
        { name: "Jet Crystal Combination Kit (FOREIGN SETTLEMENT)", price: "₹ 500", image: image11, description: "Attracts opportunities for foreign residency and work." },
        { name: "Jet Crystal Combination Kit (FOREIGN SETTLEMENT)", price: "₹ 500", image: image12, description: "Promotes success in international ventures." },
        { name: "Pyramid Product 1", price: "₹ 500", image: pyramidImage1, description: "A powerful pyramid for energy amplification." },
        { name: "Pyramid Product 2", price: "₹ 500", image: pyramidImage2, description: "Enhances spiritual growth and meditation." },
        { name: "Bracelet Product 9", price: "₹ 500", image: braceletImage9, description: "Modern design bracelet for a contemporary look." },
        { name: "Bracelet Product 10", price: "₹ 500", image: braceletImage10, description: "Exquisite bracelet with sparkling accents." },
        { name: "Bracelet Product 11", price: "₹ 500", image: braceletImage11, description: "Bohemian style bracelet, perfect for free spirits." },
        { name: "Bracelet Product 12", price: "₹ 500", image: braceletImage12_new, description: "Minimalist bracelet, ideal for stacking." },
        { name: "Bracelet Product 13", price: "₹ 500", image: braceletImage13, description: "Statement bracelet, sure to turn heads." },
        { name: "Pencil Product 3", price: "₹ 500", image: pencilImage, description: "A high-quality pencil for all your writing needs." },
    ];

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
                    {sortedProducts.map((product, index) => (
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
