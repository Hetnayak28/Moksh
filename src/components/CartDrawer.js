import React from 'react';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove, onCheckout }) => {
    // Parse numeric value of price safely
    const getItemPrice = (price) => {
        if (!price || price.toString().trim() === "") return 500;
        const num = parseFloat(price.toString().replace(/[₹\s,]/g, ''));
        return isNaN(num) ? 500 : num;
    };

    const subtotal = cartItems.reduce((sum, item) => {
        return sum + getItemPrice(item.product.price) * item.quantity;
    }, 0);

    const shippingThreshold = 1000;
    const isFreeShipping = subtotal >= shippingThreshold;
    const amountToFreeShipping = shippingThreshold - subtotal;

    return (
        <div className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="cart-drawer-header">
                    <h3>Shopping Cart ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})</h3>
                    <button className="close-btn" onClick={onClose} aria-label="Close cart">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {subtotal > 0 && (
                    <div className="shipping-promo">
                        {isFreeShipping ? (
                            <span style={{ color: 'var(--color-teal)', fontWeight: '600' }}>
                                🎉 Congratulations! You've unlocked **FREE Shipping**!
                            </span>
                        ) : (
                            <span>
                                Add <strong>₹{amountToFreeShipping}</strong> more to get <strong>FREE Shipping</strong>!
                            </span>
                        )}
                        <div className="shipping-progress-bg">
                            <div 
                                className="shipping-progress-bar" 
                                style={{ width: `${Math.min((subtotal / shippingThreshold) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                <div className="cart-drawer-body">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart-state">
                            <i className="fa-solid fa-shopping-bag empty-cart-icon"></i>
                            <h4>Your cart is empty</h4>
                            <p>Bring positive energy to your life. Browse our collection of healing crystals and bracelets.</p>
                            <button className="continue-shopping-btn" onClick={onClose}>
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="cart-items-list">
                            {cartItems.map((item, index) => {
                                const price = getItemPrice(item.product.price);
                                return (
                                    <div className="cart-item" key={index}>
                                        <img src={item.product.image} alt={item.product.name} />
                                        <div className="cart-item-details">
                                            <h5>{item.product.name}</h5>
                                            <p className="cart-item-price">₹{price.toLocaleString('en-IN')}</p>
                                            
                                            <div className="cart-item-actions">
                                                <div className="qty-picker">
                                                    <button 
                                                        onClick={() => onUpdateQuantity(item.product.name, item.quantity - 1)}
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <i className="fa-solid fa-minus"></i>
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button 
                                                        onClick={() => onUpdateQuantity(item.product.name, item.quantity + 1)}
                                                        aria-label="Increase quantity"
                                                    >
                                                        <i className="fa-solid fa-plus"></i>
                                                    </button>
                                                </div>
                                                <button 
                                                    className="remove-item-btn" 
                                                    onClick={() => onRemove(item.product.name)}
                                                    aria-label="Remove item"
                                                >
                                                    <i className="fa-regular fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-drawer-footer">
                        <div className="subtotal-row">
                            <span>Subtotal</span>
                            <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
                        </div>
                        <p className="footer-notes">Taxes and shipping calculated at checkout.</p>
                        
                        <button className="checkout-btn" onClick={onCheckout}>
                            <i className="fa-solid fa-credit-card"></i> Proceed to Checkout
                        </button>
                        <button className="drawer-continue-btn" onClick={onClose}>
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
