import React, { useState } from 'react';

const CheckoutModal = ({ isOpen, onClose, cartItems, onClearCart }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', email: '', address: '', city: '', zip: '', phone: '',
        cardNumber: '', expiry: '', cvc: ''
    });
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const getItemPrice = (price) => {
        if (!price || price.toString().trim() === "") return 500;
        const num = parseFloat(price.toString().replace(/[₹\s,]/g, ''));
        return isNaN(num) ? 500 : num;
    };

    const subtotal = cartItems.reduce((sum, item) => {
        return sum + getItemPrice(item.product.price) * item.quantity;
    }, 0);

    const shipping = subtotal >= 1000 ? 0 : 80;
    const total = subtotal + shipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
        if (!formData.address.trim()) newErrors.address = 'Shipping address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.zip.trim()) newErrors.zip = 'Postal code is required';
        if (!formData.phone.trim() || formData.phone.length < 8) newErrors.phone = 'Valid phone number is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.cardNumber.trim() || formData.cardNumber.length < 12) newErrors.cardNumber = 'Valid card number is required';
        if (!formData.expiry.trim() || !formData.expiry.includes('/')) newErrors.expiry = 'MM/YY required';
        if (!formData.cvc.trim() || formData.cvc.length < 3) newErrors.cvc = 'CVC is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            setStep(3);
        }
    };

    const handlePrevStep = () => {
        setStep(prev => prev - 1);
    };

    const handleCloseSuccess = () => {
        onClearCart();
        onClose();
    };

    // Generate mock order tracker ID
    const orderId = 'MOKSH-' + Math.floor(100000 + Math.random() * 900000);

    return (
        <div className="modal-overlay" onClick={step === 3 ? handleCloseSuccess : onClose}>
            <div className="modal-content checkout-modal-content" onClick={(e) => e.stopPropagation()}>
                {step !== 3 && (
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close checkout">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}

                {step === 3 ? (
                    <div className="checkout-success-container">
                        <div className="success-icon-badge">
                            <i className="fa-solid fa-circle-check"></i>
                        </div>
                        <h2>Order Placed Successfully!</h2>
                        <p>Thank you for shopping with MOAKSH Crystals. Your transaction was processed successfully.</p>
                        
                        <div className="order-details-card">
                            <p><strong>Order ID:</strong> <span>{orderId}</span></p>
                            <p><strong>Tracking Status:</strong> <span style={{ color: 'var(--color-teal)', fontWeight: '600' }}>Preparing for Dispatch</span></p>
                            <p><strong>Ship To:</strong> <span>{formData.name}, {formData.address}, {formData.city} - {formData.zip}</span></p>
                            <p><strong>Amount Paid:</strong> <span>₹{total.toLocaleString('en-IN')}</span></p>
                        </div>
                        
                        <p className="success-footer-notes">A confirmation email with shipping updates has been sent to **{formData.email}**.</p>
                        <button className="continue-shopping-btn" onClick={handleCloseSuccess}>
                            Close & Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="checkout-grid">
                        <div className="checkout-form-container">
                            <div className="checkout-steps-header">
                                <span className={step >= 1 ? 'active' : ''}>1. Shipping</span>
                                <i className="fa-solid fa-chevron-right step-separator"></i>
                                <span className={step >= 2 ? 'active' : ''}>2. Payment</span>
                            </div>
                            
                            <form onSubmit={handleNextStep}>
                                {step === 1 ? (
                                    <div className="form-step">
                                        <h3>Shipping Address</h3>
                                        
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name</label>
                                            <input 
                                                type="text" id="name" name="name" 
                                                value={formData.name} onChange={handleInputChange} 
                                                className={errors.name ? 'input-error' : ''} 
                                                placeholder="Het Nayak"
                                            />
                                            {errors.name && <span className="error-text">{errors.name}</span>}
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="email">Email Address</label>
                                                <input 
                                                    type="email" id="email" name="email" 
                                                    value={formData.email} onChange={handleInputChange} 
                                                    className={errors.email ? 'input-error' : ''}
                                                    placeholder="example@mail.com"
                                                />
                                                {errors.email && <span className="error-text">{errors.email}</span>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone Number</label>
                                                <input 
                                                    type="tel" id="phone" name="phone" 
                                                    value={formData.phone} onChange={handleInputChange} 
                                                    className={errors.phone ? 'input-error' : ''}
                                                    placeholder="9998887776"
                                                />
                                                {errors.phone && <span className="error-text">{errors.phone}</span>}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <input 
                                                type="text" id="address" name="address" 
                                                value={formData.address} onChange={handleInputChange} 
                                                className={errors.address ? 'input-error' : ''}
                                                placeholder="36, Jivraj Township"
                                            />
                                            {errors.address && <span className="error-text">{errors.address}</span>}
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="city">City</label>
                                                <input 
                                                    type="text" id="city" name="city" 
                                                    value={formData.city} onChange={handleInputChange} 
                                                    className={errors.city ? 'input-error' : ''}
                                                    placeholder="Rajkot"
                                                />
                                                {errors.city && <span className="error-text">{errors.city}</span>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="zip">ZIP / Postal Code</label>
                                                <input 
                                                    type="text" id="zip" name="zip" 
                                                    value={formData.zip} onChange={handleInputChange} 
                                                    className={errors.zip ? 'input-error' : ''}
                                                    placeholder="360005"
                                                />
                                                {errors.zip && <span className="error-text">{errors.zip}</span>}
                                            </div>
                                        </div>

                                        <button type="submit" className="checkout-btn" style={{ marginTop: '24px' }}>
                                            Continue to Payment <i className="fa-solid fa-arrow-right" style={{ marginLeft: '8px' }}></i>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="form-step">
                                        <h3>Simulated Payment</h3>
                                        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
                                            🔒 Secure connection. Enter any mock card numbers for testing.
                                        </p>
                                        
                                        <div className="form-group">
                                            <label htmlFor="cardNumber">Card Number</label>
                                            <input 
                                                type="text" id="cardNumber" name="cardNumber" 
                                                value={formData.cardNumber} onChange={handleInputChange} 
                                                className={errors.cardNumber ? 'input-error' : ''}
                                                placeholder="1111 2222 3333 4444"
                                            />
                                            {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="expiry">Expiration Date</label>
                                                <input 
                                                    type="text" id="expiry" name="expiry" 
                                                    value={formData.expiry} onChange={handleInputChange} 
                                                    className={errors.expiry ? 'input-error' : ''}
                                                    placeholder="MM/YY"
                                                />
                                                {errors.expiry && <span className="error-text">{errors.expiry}</span>}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cvc">CVC</label>
                                                <input 
                                                    type="text" id="cvc" name="cvc" 
                                                    value={formData.cvc} onChange={handleInputChange} 
                                                    className={errors.cvc ? 'input-error' : ''}
                                                    placeholder="123"
                                                />
                                                {errors.cvc && <span className="error-text">{errors.cvc}</span>}
                                            </div>
                                        </div>

                                        <div className="form-actions-row" style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                                            <button 
                                                type="button" 
                                                className="drawer-continue-btn" 
                                                onClick={handlePrevStep}
                                                style={{ width: '120px', padding: '12px 0' }}
                                            >
                                                Back
                                            </button>
                                            <button type="submit" className="checkout-btn" style={{ flexGrow: 1 }}>
                                                Place Order • ₹{total.toLocaleString('en-IN')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                        
                        <div className="checkout-summary-sidebar">
                            <h3>Order Summary</h3>
                            <div className="divider"></div>
                            
                            <div className="checkout-summary-list">
                                {cartItems.map((item, i) => (
                                    <div className="summary-item" key={i}>
                                        <div className="summary-item-info">
                                            <span className="summary-item-name">{item.product.name}</span>
                                            <span className="summary-item-qty">Qty: {item.quantity}</span>
                                        </div>
                                        <span className="summary-item-price">
                                            ₹{(getItemPrice(item.product.price) * item.quantity).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="divider" style={{ margin: '16px 0' }}></div>
                            
                            <div className="summary-price-row">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            
                            <div className="summary-price-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                            </div>
                            
                            <div className="divider" style={{ margin: '16px 0' }}></div>
                            
                            <div className="summary-price-row grand-total">
                                <span>Total Due</span>
                                <strong>₹{total.toLocaleString('en-IN')}</strong>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;
