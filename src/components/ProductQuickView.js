import React, { useState } from 'react';

const ProductQuickView = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddClick = () => {
        onAddToCart(product, quantity);
        onClose();
    };

    const formatPrice = (price) => {
        if (!price || price.toString().trim() === "") return '₹ 500';
        const str = price.toString().trim();
        if (str.startsWith('₹')) return str;
        return `₹ ${str}`;
    };

    // Helper to determine target Chakras for crystal branding value
    const getChakras = (prod) => {
        const name = prod.name.toLowerCase();
        const desc = prod.description ? prod.description.toLowerCase() : "";
        
        if (name.includes('7 chakra') || desc.includes('7 chakra') || desc.includes('seven chakras')) {
            return [
                { name: 'Root', color: '#ef4444' },
                { name: 'Sacral', color: '#f97316' },
                { name: 'Solar Plexus', color: '#eab308' },
                { name: 'Heart', color: '#22c55e' },
                { name: 'Throat', color: '#0ea5e9' },
                { name: 'Third Eye', color: '#6366f1' },
                { name: 'Crown', color: '#a855f7' }
            ];
        }
        
        const list = [];
        if (name.includes('tiger eye') || name.includes('citrine')) {
            list.push({ name: 'Solar Plexus', color: '#eab308' });
            list.push({ name: 'Sacral', color: '#f97316' });
        }
        if (name.includes('jasper') || name.includes('lava')) {
            list.push({ name: 'Root', color: '#ef4444' });
        }
        if (name.includes('money magnate')) {
            list.push({ name: 'Solar Plexus', color: '#eab308' });
            list.push({ name: 'Heart', color: '#22c55e' });
        }
        if (name.includes('howlite')) {
            list.push({ name: 'Crown', color: '#a855f7' });
        }
        if (name.includes('protection')) {
            list.push({ name: 'Root', color: '#ef4444' });
            list.push({ name: 'Crown', color: '#a855f7' });
        }
        return list;
    };

    const chakras = getChakras(product);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                    <i className="fa-solid fa-xmark"></i>
                </button>
                
                <div className="product-quick-view-grid">
                    <div className="quick-view-image-container">
                        <img src={product.image} alt={product.name} />
                    </div>
                    
                    <div className="quick-view-details">
                        <span className="premium-badge">MOKSH EXCLUSIVE</span>
                        <h2>{product.name}</h2>
                        
                        <p className="quick-view-price">{formatPrice(product.price)}</p>
                        
                        <div className="divider"></div>
                        
                        <div className="quick-view-description">
                            <h4>Benefits & Healing Properties</h4>
                            <p>{product.description || "No description available. Experience the natural energetic qualities of authentic crystals handcrafted with spiritual care."}</p>
                        </div>

                        {chakras.length > 0 && (
                            <div className="chakra-section" style={{ marginTop: '20px' }}>
                                <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px', letterSpacing: '0.05em' }}>Associated Chakras</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {chakras.map((c, i) => (
                                        <span 
                                            key={i} 
                                            style={{ 
                                                fontSize: '11px', 
                                                fontWeight: '700', 
                                                padding: '4px 10px', 
                                                borderRadius: 'var(--radius-full)', 
                                                color: '#fff', 
                                                backgroundColor: c.color,
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            {c.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="divider"></div>
                        
                        <div className="quick-view-actions">
                            <div className="quick-view-qty-picker">
                                <span style={{ fontWeight: '600', fontSize: '14px', color: 'var(--color-text-muted)' }}>Quantity</span>
                                <div className="qty-picker">
                                    <button onClick={handleDecrement} aria-label="Decrease quantity">
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                    <span>{quantity}</span>
                                    <button onClick={handleIncrement} aria-label="Increase quantity">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <button className="add-to-cart-action-btn" onClick={handleAddClick}>
                                <i className="fa-solid fa-cart-shopping"></i> Add to Cart • {(getItemPrice(product.price) * quantity).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper inside file for pricing calculations
function getItemPrice(price) {
    if (!price || price.toString().trim() === "") return 500;
    const num = parseFloat(price.toString().replace(/[₹\s,]/g, ''));
    return isNaN(num) ? 500 : num;
}

export default ProductQuickView;
