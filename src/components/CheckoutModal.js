import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';

const CheckoutModal = ({ isOpen, onClose, cartItems, onClearCart }) => {
    const [step, setStep] = useState(1);
    const [orderId] = useState(() => 'MOKSH-' + Math.floor(100000 + Math.random() * 900000));
    const [activeTab, setActiveTab] = useState('gpay'); // 'gpay', 'upi', 'card'
    const [upiOption, setUpiOption] = useState('qr'); // 'qr', 'id'
    const [upiId, setUpiId] = useState('');
    const [upiTimer, setUpiTimer] = useState(60);
    const [upiRequestSent, setUpiRequestSent] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingMessage, setProcessingMessage] = useState('');
    
    const [formData, setFormData] = useState({
        name: '', email: '', address: '', city: '', zip: '', phone: '',
        cardNumber: '', expiry: '', cvc: ''
    });
    const [errors, setErrors] = useState({});
    
    const timerRef = useRef(null);

    useEffect(() => {
        if (upiRequestSent && upiTimer > 0) {
            timerRef.current = setTimeout(() => {
                setUpiTimer(prev => prev - 1);
            }, 1000);
        } else if (upiTimer === 0) {
            // Simulated timeout/auto-approve for testing convenience
            handlePlaceOrder('UPI (Simulated ID)');
        }
        return () => clearTimeout(timerRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [upiRequestSent, upiTimer]);

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

    // Generate UPI Payment URI
    // Payee Address: hetnayak28@okaxis
    const payeeAddress = 'hetnayak28@okaxis';
    const payeeName = 'Moaksh Crystals';
    const upiLink = `upi://pay?pa=${payeeAddress}&pn=${encodeURIComponent(payeeName)}&am=${total}&cu=INR&tn=${encodeURIComponent('Order ' + orderId)}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

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

    const validateCard = () => {
        const newErrors = {};
        if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 12) {
            newErrors.cardNumber = 'Valid card number is required';
        }
        if (!formData.expiry.trim() || !formData.expiry.includes('/')) {
            newErrors.expiry = 'MM/YY required';
        }
        if (!formData.cvc.trim() || formData.cvc.length < 3) {
            newErrors.cvc = 'CVC is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async (paymentMethodName) => {
        setIsProcessing(true);
        setProcessingMessage('Securing connection and saving order...');
        
        // Prepare items details
        const orderItemsList = cartItems.map(item => ({
            name: item.product.name,
            price: getItemPrice(item.product.price),
            quantity: item.quantity,
            image_name: item.product.image_name || ''
        }));

        try {
            const { error: insertError } = await supabase.from('orders').insert({
                order_id: orderId,
                customer_name: formData.name,
                customer_email: formData.email,
                customer_phone: formData.phone,
                shipping_address: formData.address,
                shipping_city: formData.city,
                shipping_zip: formData.zip,
                subtotal: subtotal,
                shipping_fee: shipping,
                total_amount: total,
                payment_method: paymentMethodName,
                order_items: orderItemsList,
                status: 'Pending'
            });

            if (insertError) {
                console.error("Supabase order insert error:", insertError);
            }
        } catch (err) {
            console.error("Failed to write to database:", err);
        } finally {
            setIsProcessing(false);
            setStep(3);
        }
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        if (step === 1 && validateStep1()) {
            setStep(2);
        }
    };

    const handlePrevStep = () => {
        setStep(prev => prev - 1);
    };

    const handleCloseSuccess = () => {
        onClearCart();
        onClose();
    };

    const handleSendUpiRequest = () => {
        if (!upiId.trim() || !upiId.includes('@')) {
            alert('Please enter a valid UPI ID (e.g. user@bank)');
            return;
        }
        setUpiRequestSent(true);
        setUpiTimer(60);
    };

    return (
        <div className="modal-overlay" onClick={step === 3 ? handleCloseSuccess : onClose}>
            <div className="modal-content checkout-modal-content" onClick={(e) => e.stopPropagation()}>
                {step !== 3 && (
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close checkout">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                )}

                {isProcessing ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px', textAlign: 'center', padding: '24px' }}>
                        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '48px', color: 'var(--color-primary)', marginBottom: '24px' }}></i>
                        <h3 style={{ fontSize: '20px', fontWeight: '700' }}>Processing Payment</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>{processingMessage}</p>
                    </div>
                ) : step === 3 ? (
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
                            
                            {step === 1 ? (
                                <form onSubmit={handleNextStep}>
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
                                </form>
                            ) : (
                                <div className="form-step">
                                    <h3>Select Payment Method</h3>
                                    
                                    {/* Amethyst Styled Tab Headers */}
                                    <div className="payment-tabs-container" style={{ display: 'flex', borderBottom: '2px solid var(--color-border)', marginBottom: '24px', gap: '8px' }}>
                                        <button 
                                            type="button"
                                            onClick={() => setActiveTab('gpay')}
                                            style={{
                                                flex: 1, padding: '12px 8px', border: 'none', background: 'none',
                                                borderBottom: activeTab === 'gpay' ? '3px solid var(--color-primary)' : '3px solid transparent',
                                                color: activeTab === 'gpay' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                                fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s'
                                            }}
                                        >
                                            <i className="fa-brands fa-google-pay" style={{ fontSize: '24px' }}></i> GPay
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setActiveTab('upi')}
                                            style={{
                                                flex: 1, padding: '12px 8px', border: 'none', background: 'none',
                                                borderBottom: activeTab === 'upi' ? '3px solid var(--color-primary)' : '3px solid transparent',
                                                color: activeTab === 'upi' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                                fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s'
                                            }}
                                        >
                                            <i className="fa-solid fa-qrcode"></i> UPI Pay
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setActiveTab('card')}
                                            style={{
                                                flex: 1, padding: '12px 8px', border: 'none', background: 'none',
                                                borderBottom: activeTab === 'card' ? '3px solid var(--color-primary)' : '3px solid transparent',
                                                color: activeTab === 'card' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                                fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s'
                                            }}
                                        >
                                            <i className="fa-solid fa-credit-card"></i> Card
                                        </button>
                                    </div>

                                    {/* TAB 1: GOOGLE PAY */}
                                    {activeTab === 'gpay' && (
                                        <div style={{ textAlign: 'center', padding: '16px 0' }}>
                                            <div style={{ background: 'var(--color-bg-base)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                                                <i className="fa-brands fa-google-pay" style={{ fontSize: '72px', color: 'var(--color-text-main)' }}></i>
                                                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                                                    Quickly check out using your Google Pay credentials. Click the button below to authorize.
                                                </p>
                                            </div>
                                            
                                            <button 
                                                type="button"
                                                onClick={() => handlePlaceOrder('Google Pay')}
                                                style={{
                                                    backgroundColor: '#000000', color: '#ffffff', border: 'none', borderRadius: '8px',
                                                    padding: '14px 28px', fontSize: '16px', fontWeight: '600', width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                                                }}
                                            >
                                                <i className="fa-brands fa-google-pay" style={{ fontSize: '28px' }}></i> Pay Now
                                            </button>
                                        </div>
                                    )}

                                    {/* TAB 2: UPI PAYMENT */}
                                    {activeTab === 'upi' && (
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
                                                <button 
                                                    type="button"
                                                    onClick={() => setUpiOption('qr')}
                                                    style={{
                                                        padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--color-border)', cursor: 'pointer',
                                                        backgroundColor: upiOption === 'qr' ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                                                        color: upiOption === 'qr' ? 'white' : 'var(--color-text-main)', fontWeight: '600', fontSize: '12px'
                                                    }}
                                                >
                                                    Scan QR Code
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={() => setUpiOption('id')}
                                                    style={{
                                                        padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--color-border)', cursor: 'pointer',
                                                        backgroundColor: upiOption === 'id' ? 'var(--color-primary)' : 'var(--color-bg-surface)',
                                                        color: upiOption === 'id' ? 'white' : 'var(--color-text-main)', fontWeight: '600', fontSize: '12px'
                                                    }}
                                                >
                                                    Enter UPI ID
                                                </button>
                                            </div>

                                            {upiOption === 'qr' ? (
                                                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                                                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                                                        Scan this QR code with Google Pay, PhonePe, Paytm or any UPI app to pay.
                                                    </p>
                                                    
                                                    <div style={{ display: 'inline-block', background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', marginBottom: '16px' }}>
                                                        <img src={qrCodeUrl} alt="UPI QR Code" style={{ display: 'block', width: '180px', height: '180px' }} />
                                                    </div>
                                                    
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                                                        <a href={upiLink} style={{ display: 'inline-block', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
                                                            <i className="fa-solid fa-mobile-screen-button"></i> Click to Pay on Mobile
                                                        </a>
                                                        
                                                        <button 
                                                            type="button" 
                                                            className="checkout-btn" 
                                                            onClick={() => handlePlaceOrder('UPI QR Code')}
                                                            style={{ width: '100%', marginTop: '12px' }}
                                                        >
                                                            Verify & Confirm Payment
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    {!upiRequestSent ? (
                                                        <div style={{ padding: '12px 0' }}>
                                                            <div className="form-group">
                                                                <label htmlFor="upiId">Enter Virtual Payment Address (UPI ID)</label>
                                                                <input 
                                                                    type="text" id="upiId" 
                                                                    value={upiId} onChange={(e) => setUpiId(e.target.value)} 
                                                                    placeholder="example@okaxis" 
                                                                    style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                                                                />
                                                            </div>
                                                            <button 
                                                                type="button" 
                                                                className="checkout-btn" 
                                                                onClick={handleSendUpiRequest}
                                                                style={{ width: '100%', marginTop: '20px' }}
                                                            >
                                                                Send Payment Request
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                                                            <i className="fa-solid fa-bell fa-shake" style={{ fontSize: '36px', color: 'var(--color-primary)', marginBottom: '16px' }}></i>
                                                            <h4>Request Sent to {upiId}</h4>
                                                            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
                                                                Please open your GPay/BHIM app and approve the transaction request for <strong>₹{total.toLocaleString('en-IN')}</strong>.
                                                            </p>
                                                            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-primary)', margin: '16px 0' }}>
                                                                00:{upiTimer < 10 ? '0' + upiTimer : upiTimer}
                                                            </div>
                                                            <button 
                                                                type="button" 
                                                                className="drawer-continue-btn" 
                                                                onClick={() => handlePlaceOrder('UPI ID Request')}
                                                                style={{ width: '100%' }}
                                                            >
                                                                I Have Approved Payment
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* TAB 3: CREDIT/DEBIT CARD */}
                                    {activeTab === 'card' && (
                                        <form onSubmit={(e) => { e.preventDefault(); if (validateCard()) handlePlaceOrder('Card'); }}>
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

                                            <button type="submit" className="checkout-btn" style={{ width: '100%', marginTop: '24px' }}>
                                                Authorize Card • ₹{total.toLocaleString('en-IN')}
                                            </button>
                                        </form>
                                    )}

                                    {/* General Actions Row */}
                                    <div className="form-actions-row" style={{ display: 'flex', gap: '16px', marginTop: '32px', borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                                        <button 
                                            type="button" 
                                            className="drawer-continue-btn" 
                                            onClick={handlePrevStep}
                                            style={{ width: '120px', padding: '12px 0' }}
                                        >
                                            Back
                                        </button>
                                        <div style={{ flexGrow: 1 }} />
                                    </div>
                                </div>
                            )}
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
