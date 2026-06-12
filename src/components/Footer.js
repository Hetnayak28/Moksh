import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email && email.includes('@') && email.includes('.')) {
            alert(`Thank you for subscribing with ${email}!`);
            setEmail('');
        } else {
            alert('Please enter a valid email address.');
        }
    };

    return (
        <footer>
            <div className="container">
                <div className="footer-section about-us-info">
                    <h4>About MOAKSH</h4>
                    <p>At MOAKSH, we deliver the best possible healing crystals and wellness products, competitive in the world market with the least possible time consumption – at Jet Speed with values beyond imagination.</p>
                </div>
                <div className="footer-section contact-info">
                    <h4>Got Questions?</h4>
                    <p><i className="fa-solid fa-phone" style={{ marginRight: '8px', color: 'var(--color-secondary)' }}></i>(+91) 8401536267</p>
                    <p><i className="fa-solid fa-location-dot" style={{ marginRight: '8px', color: 'var(--color-secondary)' }}></i>36, Jivraj Township, Near Ambica Township, Rajkot, Gujarat, 360005</p>
                </div>
                <div className="footer-section navigation">
                    <h4>Navigation</h4>
                    <ul>
                        <li>
                            <Link to="/about-us">
                                <i className="fa-solid fa-chevron-right" style={{ fontSize: '11px', marginRight: '6px' }}></i>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <i className="fa-solid fa-chevron-right" style={{ fontSize: '11px', marginRight: '6px' }}></i>
                                Home
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-section newsletter">
                    <h4>Newsletter</h4>
                    <p style={{ fontSize: '13px', marginBottom: '12px' }}>Sign up to receive updates, special offers, and wellness guides.</p>
                    <form onSubmit={handleNewsletterSubmit}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                    <p className="privacy-text">By providing your email address, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
            </div>
            <div className="bottom-bar">
                <div className="container">
                    <p>Copyright © 2026 MOAKSH Crystals. All Rights Reserved. Designed with positive vibes.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
